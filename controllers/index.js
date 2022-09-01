const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const anime_pageRoutes = require('./anime_pageRoute');

router.use('/', homeRoutes);
router.use('/anime', anime_pageRoutes);
router.use('/api', apiRoutes);


module.exports = router;
