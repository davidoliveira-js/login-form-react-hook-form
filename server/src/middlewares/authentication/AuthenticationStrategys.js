const passport = require('passport');
const { verifyAccessToken } = require('../../utils/tokens');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const {
  Unauthorized,
} = require('../../utils/error-handler/Exceptions');
const {
  IncorrectLogin,
  UserNotAuthorized,
} = require('../../utils/constants');

const { UserServices } = require('../../services');
const userServices = new UserServices('User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const newUserLogin = await userServices.getOneData({
          email: email,
        });

        if (!newUserLogin) {
          throw new Unauthorized(IncorrectLogin);
        }

        const passwordValidation = await bcrypt.compare(
          password,
          newUserLogin.password
        );

        if (!passwordValidation) {
          throw new Unauthorized(IncorrectLogin);
        }

        const user = { ...newUserLogin.dataValues };
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (accessToken, done) => {
    try {
      const id = await verifyAccessToken(accessToken);
      const user = await userServices.getOneData({ id: id });
      done(null, user, { accessToken });
    } catch (error) {
      done(new Unauthorized(UserNotAuthorized));
    }
  })
);

module.exports = passport;
