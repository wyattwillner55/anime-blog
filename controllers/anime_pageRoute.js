const router = require('express').Router();
const { Anime } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('individualAnime', {
      logged_in: req.session.logged_in
    });
});



module.exports = router;