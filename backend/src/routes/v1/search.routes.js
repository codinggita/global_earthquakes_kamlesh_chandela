const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/search.controller');

router.get('/earthquakes', searchController.searchEarthquakes);
router.options('/earthquakes', (req, res) => {
  res.header('Allow', 'GET, OPTIONS');
  res.status(200).send();
});

module.exports = router;
