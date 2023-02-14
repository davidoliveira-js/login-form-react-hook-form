const userRoutes = require('./UserRoutes');
//const authRoutes = require('./AuthRoutes');

module.exports = (app) => {
  app.use(userRoutes);
};
