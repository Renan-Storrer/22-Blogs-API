const { Router } = require('express');

const { userController } = require('../controller');

const { validateToken } = require('../middleware/validateToken');
const { validateLogin } = require('../middleware/validateLogin');

const router = Router();

router.post('/login', validateLogin, userController.userLogin);

router.post('/user', userController.create);
router.get('/user', validateToken, userController.findAll);
router.get('/user/:id', validateToken, userController.findById);
router.delete('/user/me', validateToken, userController.remove);

module.exports = router;