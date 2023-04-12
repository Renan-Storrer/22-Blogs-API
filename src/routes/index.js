const { Router } = require('express');
const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');

const router = Router();

router.use(userRoutes);
router.use(categoryRoutes);

module.exports = router;