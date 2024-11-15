const express = require('express');
const { getCoverImage } = require('../controllers/imageController');
const router = express.Router();

router.get('/cover/:id', getCoverImage);

module.exports = router;
