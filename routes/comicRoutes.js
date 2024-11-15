const express = require('express');
const router = express.Router();
const { createComic } = require('../controllers/comicController');
const { uploadSingle } = require('../controllers/uploadController');

router.post('/', uploadSingle, createComic);

module.exports = router;
