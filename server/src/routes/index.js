const UserRoutes = require('./UserRoutes');
const PostRoutes = require('./PostRoutes');
const AuthRoutes = require('./AuthRoutes');

module.exports = (app) => {
  app.use(UserRoutes, AuthRoutes, PostRoutes);
};
