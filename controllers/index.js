const router = require('express').Router();
const apiRoutes = require('./api');
const homePage = require('./homepage')

router.use('/api', apiRoutes);
router.use('/', homePage);

module.exports = router;