const express = require('express');

const router = express.Router();

const Url = require('../models/url');

router.get('/:shortcode', async (req, res) => {
  try {
    const url = await Url.findOne({
      urlCode: req.params.shortcode,
    });
    if (url) {
      return res.redirect(url.urlOriginal);
    } else {
      return res.status(404).json('No URL Found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
});

router.get('/:shortcode/stats', async (req, res) => {
  try {
    const url = await Url.findOne({
      urlCode: req.params.shortcode,
    });
    if (url) {
      return res.status(200).json(url);
    } else {
      return res.status(404).json('No URL Found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
