const passport = require('passport');
const {
  UserNotAuthorized,
  StatusError,
  UserLogout,
} = require('../../utils/constants');
const {
  Unauthorized,
  InternalServerError,
} = require('../../utils/error-handler/Exceptions');
const {
  invalidateOpaqueToken,
  verifyOpaqueToken,
  invalidateAccessToken,
} = require('../../utils/tokens');
const { UserServices } = require('../../services');
const userServices = new UserServices('User');

module.exports = {
  local(req, res, next) {
    passport.authenticate(
      'local',
      { session: false },
      (error, user, info) => {
        if (error || !user || info) {
          next(error);
        }
        req.user = user;
        return next();
      }
    )(req, res, next);
  },

  bearer(req, res, next) {
    passport.authenticate(
      'bearer',
      { session: false },
      (error, user, info) => {
        if (!user) {
          return next(new Unauthorized(UserNotAuthorized));
        }
        if (error) {
          return next(error);
        }
        req.accessToken = info.accessToken;
        req.user = user;
        return next();
      }
    )(req, res, next);
  },

  async logout(req, res, next) {
    try {
      const { userId } = req.params;
      const { id } = req.user;

      if (userId != id) {
        throw new Unauthorized(UserNotAuthorized);
      }
      const accessToken = req.accessToken;
      const invalidateAccessTokenResult = await invalidateAccessToken(
        accessToken
      );

      if (!invalidateAccessTokenResult) {
        throw new InternalServerError(StatusError);
      }

      return res.status(200).json({
        success: true,
        return: { message: UserLogout },
      });
    } catch (error) {
      next(error);
    }
  },

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const id = await verifyOpaqueToken(refreshToken);

      if (!id) {
        throw new Unauthorized(UserNotAuthorized);
      }

      await invalidateOpaqueToken(refreshToken);
      req.user = { id: id };
      return next();
    } catch (error) {
      next(error);
    }
  },
};
