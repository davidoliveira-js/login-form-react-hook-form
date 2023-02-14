const { Router } = require('express');
const userController = require('../controllers/UserController');

const router = Router();

router.get('/users', userController.findAll);
router.get('/users/:userId', userController.findById);
router.post('/users', userController.store);
router.put('/users/:userId', userController.update);
router.delete('/users/:userId', userController.delete);
router.post('/users/:userId', userController.restore);

module.exports = router;
