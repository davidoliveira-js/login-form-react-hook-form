const {
  UserSuccessLogin,
  DataSuccessCreate,
  StatusError,
  UserLogout,
  UserNotAuthorized,
} = require('../utils/constants');
const {
  createAccessToken,
  createOpaqueToken,
  invalidateAccessToken,
} = require('../utils/tokens');
const { UserServices } = require('../services');
const {
  InternalServerError,
  Unauthorized,
} = require('../utils/error-handler/Exceptions');
const userServices = new UserServices('User');

module.exports = {
  async login(req, res, next) {
    try {
      const { id } = req.user;
      const user = await userServices.getOneData({ id: id });
      const accessToken = createAccessToken(
        { id: user.id, email: user.email },
        [15, 'm']
      );

      const refreshToken = await createOpaqueToken(req.user.id, [
        5,
        'd',
      ]);

      return res.json({
        success: true,
        return: UserSuccessLogin,
        data: { accessToken, refreshToken },
      });
    } catch (error) {
      next(error);
    }
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

  async refreshToken(req, res, next) {
    try {
      const accessToken = createAccessToken(
        { id: req.user.id, role: req.user.role },
        [15, 'm']
      );
      const refreshToken = await createOpaqueToken(req.user.id, [
        5,
        'd',
      ]);
      return res.status(200).json({
        success: true,
        return: {
          message: DataSuccessCreate,
          data: { accessToken, refreshToken },
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
