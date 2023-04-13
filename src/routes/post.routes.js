const { Router } = require('express');

const { postController } = require('../controller');

const { validateToken } = require('../middleware/validateToken');
const { validatePost } = require('../middleware/validatePost');
const { validateUpdatePost } = require('../middleware/validateUpdatePost');

const router = Router();

router.post('/post', validateToken, validatePost, postController.create);
router.get('/post', validateToken, postController.findAll);
router.get('/post/:id', validateToken, postController.findById);
router.put('/post/:id', validateToken, validateUpdatePost, postController.update);
router.delete('/post/:id', validateToken, postController.remove);

module.exports = router;