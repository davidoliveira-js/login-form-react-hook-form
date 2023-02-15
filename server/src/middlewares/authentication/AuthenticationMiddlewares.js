const passport = require('passport');

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
};
