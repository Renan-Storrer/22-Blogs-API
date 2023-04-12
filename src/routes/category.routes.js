const { Router } = require('express');

const { validateToken } = require('../middleware/validateToken');
const { categoryController } = require('../controller');

const router = Router();

router.post('/categories', validateToken, categoryController.create);
router.get('/categories', validateToken, categoryController.findAll);

module.exports = router;