const express = require('express');
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');

const router = express.Router();
require('dotenv').config();

// Models
const Url = require('../models/url');

// Url Api
const PORT = process.env.PORT || 8010;
const SERVER = process.env.SERVER || `http://localhost`;

const baseUrl = `${SERVER}:${PORT}/api`;

router.post('/register', async (req, res) => {
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base URL');
  }
  // body example: {"urlOriginal": "https://www.av.com"}
  const { urlOriginal } = req.body; // destructure the urlOriginal from req.body
  let { urlCode } = req.body;
  if (urlCode) {
    if (typeof urlCode === 'string') {
      if (urlCode.length < 4) {
        return res.status(422).json('UrlCode should be longer than 4 letters');
      }
    } else {
      return res.status(422).json('Type Invalid urlCode');
    }
  }

  if (!urlCode) {
    urlCode = nanoid(6);
  }

  urlCode = urlCode.toLowerCase();
  if (validUrl.isUri(urlOriginal)) {
    try {
      let url = await Url.findOne({
        urlOriginal,
      });

      if (url) {
        return res.status(409).json(url.urlCode);
      } else {
        const urlShort = baseUrl + '/' + urlCode;

        url = new Url({
          urlOriginal,
          urlShort,
          urlCode,
        });
        await url.save();
        return res.status(201).json(url);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json('Server Error');
    }
  } else {
    return res.status(422).json('Invalid urlOriginal');
  }
});

module.exports = router;
