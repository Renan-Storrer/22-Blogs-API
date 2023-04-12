const { Router } = require('express');
const { validateToken } = require('../middleware/validateToken');
const { validatePost } = require('../middleware/validatePost');
const { postController } = require('../controller');

const router = Router();

router.post('/post', validateToken, validatePost, postController.create);
router.get('/post', validateToken, postController.findAll);
router.get('/post/:id', validateToken, postController.findById)

module.exports = router;