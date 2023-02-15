const { Router } = require('express');
const authController = require('../controllers/AuthController');
const authenticationMiddlewares = require('../middlewares/authentication/AuthenticationMiddlewares');

const router = Router();

router.post(
  '/auth',
  authenticationMiddlewares.local,
  authController.login
);

module.exports = router;
