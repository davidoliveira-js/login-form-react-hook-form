const passport = require('passport');
const { UserNotAuthorized } = require('../../utils/constants');
const {
  Unauthorized,
} = require('../../utils/error-handler/Exceptions');

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
};
