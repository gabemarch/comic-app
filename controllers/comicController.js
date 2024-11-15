const Comic = require('../models/Comic');

const createComic = async (req, res) => {
  try {
    const { 
      originalTitle,
      translatedTitle,
      publisher,
      hunPublisher,
      language,
      pageNumber,
      genre,
      releaseYear,
      writer,
      illustrations,
      colorist,
      translator,
      rating,
      reviews 
    } = req.body;
    const coverImageId = req.files['coverImage'] ? req.files['coverImage'][0].id : null;

    const comic = new Comic({
      originalTitle,
      translatedTitle,
      publisher,
      hunPublisher,
      language,
      pageNumber,
      genre,
      releaseYear,
      writer,
      illustrations,
      colorist,
      translator,
      rating,
      reviews,
      coverImage: coverImageId
    });

    const newComic = await comic.save();
    res.status(201).json(newComic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createComic };
