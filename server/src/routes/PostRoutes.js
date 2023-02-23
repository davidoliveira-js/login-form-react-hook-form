const { Router } = require('express');
const postController = require('../controllers/PostController');
const authenticationMiddlewares = require('../middlewares/authentication/AuthenticationMiddlewares');
const authorization = require('../middlewares/autorization/Authorization');

const router = Router();

router.get(
  '/posts',
  // [authenticationMiddlewares.bearer, authorization('users', 'read')],
  postController.findAll
);

router.get(
  '/posts/:postId',
  // [authenticationMiddlewares.bearer, authorization('users', 'read')],
  postController.findById
);

router.post('/posts', postController.store);

router.put(
  '/posts/:postId',
  // [
  //   authenticationMiddlewares.bearer,
  //   authorization('users', 'update'),
  // ],
  postController.update
);

router.delete(
  '/posts/:postId',
  // [
  //   authenticationMiddlewares.bearer,
  //   authorization('users', 'delete'),
  // ],
  postController.delete
);

router.post(
  '/posts/:postId',
  // [
  //   authenticationMiddlewares.bearer,
  //   authorization('users', 'create'),
  // ],
  postController.restore
);

module.exports = router;
