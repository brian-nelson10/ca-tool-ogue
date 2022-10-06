const router = require('express').Router();
const userRoutes = require('./user-routes');
const toolRoutes = require('./tool-routes');

router.use('/users', userRoutes);
router.use('/tools', toolRoutes);

module.exports = router;