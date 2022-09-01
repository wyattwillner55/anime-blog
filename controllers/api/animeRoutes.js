const router = require('express').Router();
const { Anime } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    // find all users
    try {
      const animeData = await Anime.findAll({});
      if (!animeData) {
        res.status(404).json({ message: 'No category with this id!' });
        return;
      }
      res.status(200).json(animeData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router