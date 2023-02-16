const { Router } = require('express');
const userController = require('../controllers/UserController');
const authenticationMiddlewares = require('../middlewares/authentication/AuthenticationMiddlewares');
const authorization = require('../middlewares/autorization/Authorization');

const router = Router();

router.get(
  '/users',
  [authenticationMiddlewares.bearer, authorization('users', 'read')],
  userController.findAll
);

router.get(
  '/users/:userId',
  authenticationMiddlewares.bearer,
  userController.findById
);

router.post('/users', userController.store);

router.put(
  '/users/:userId',
  [
    authenticationMiddlewares.bearer,
    authorization('users', 'update'),
  ],
  userController.update
);

router.delete(
  '/users/:userId',
  [
    authenticationMiddlewares.bearer,
    authorization('users', 'delete'),
  ],
  userController.delete
);

router.post(
  '/users/:userId',
  [
    authenticationMiddlewares.bearer,
    authorization('users', 'create'),
  ],
  userController.restore
);

module.exports = router;
