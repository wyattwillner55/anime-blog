const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const animeRoutes = require('./animeRoutes');


router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/anime', animeRoutes);

module.exports = router;
