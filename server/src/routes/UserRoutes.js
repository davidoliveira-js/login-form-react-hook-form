const { Router } = require('express');
const userController = require('../controllers/UserController');
const authenticationMiddlewares = require('../middlewares/authentication/AuthenticationMiddlewares');

const router = Router();

router.get(
  '/users',
  authenticationMiddlewares.bearer,
  userController.findAll
);
router.get(
  '/users/:userId',
  authenticationMiddlewares.bearer,
  userController.findById
);
router.post(
  '/users',
  authenticationMiddlewares.bearer,
  userController.store
);
router.put(
  '/users/:userId',
  authenticationMiddlewares.bearer,
  userController.update
);
router.delete(
  '/users/:userId',
  authenticationMiddlewares.bearer,
  userController.delete
);
router.post(
  '/users/:userId',
  authenticationMiddlewares.bearer,
  userController.restore
);

module.exports = router;
