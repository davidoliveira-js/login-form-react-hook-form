const { Router } = require('express');
const authController = require('../controllers/AuthController');
const authenticationMiddlewares = require('../middlewares/authentication/AuthenticationMiddlewares');

const router = Router();

router.post(
  '/auth',
  authenticationMiddlewares.local,
  authController.login
);

router.post(
  '/auth/refresh-token',
  authenticationMiddlewares.refresh,
  authController.refreshToken
);

router.post(
  '/auth/logout/:userId',
  [
    authenticationMiddlewares.bearer,
    authenticationMiddlewares.refresh,
  ],
  authController.logout
);

module.exports = router;
