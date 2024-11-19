const express = require('express');
const router = express.Router();
const { 
  createComic,
  getAllComics,
  getComicById,
  updateComic,
  deleteComic 
} = require('../controllers/comicController');
const { uploadSingle } = require('../controllers/uploadController');
const { getCoverImage } = require('../controllers/imageController');


router.post('/', uploadSingle, createComic);
router.get('/', getAllComics);
router.get('/:id', getComicById);
router.get('/cover/:id', getCoverImage);

router.put('/:id', uploadSingle, updateComic);
router.delete('/:id', deleteComic);

module.exports = router;
