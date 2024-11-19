const Comic = require('../models/Comic');
const gfs = require('../config/db');
const mongoose = require('mongoose');

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

const getAllComics = async (req, res) => {
  try {
    const comics = await Comic.find();
    res.status(200).json(comics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getComicById = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id);

    if (!comic) {
      return res.status(404).json({ message: 'Comic not found' });
    }

    res.status(200).json(comic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFile = async (fileId) => {
  const db = mongoose.connection.db;

  // Töröljük a fájlt az uploads.files kollekcióból
  await db.collection('uploads.files').deleteOne({ _id: new mongoose.Types.ObjectId(fileId) });

  // Töröljük a fájlhoz tartozó részeket az uploads.chunks kollekcióból
  await db.collection('uploads.chunks').deleteMany({ files_id: new mongoose.Types.ObjectId(fileId) });
};

const updateComic = async (req, res) => {
  try {
    const { id } = req.params;
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
    } = req.body;

    const comic = await Comic.findById(id);

    if (!comic) {
      return res.status(404).json({ message: 'Comic not found' });
    }

    // Frissítsük az adatokat, ha azok léteznek a kérésben
    if (originalTitle) comic.originalTitle = originalTitle;
    if (translatedTitle) comic.translatedTitle = translatedTitle;
    if (publisher) comic.publisher = publisher;
    if (hunPublisher) comic.hunPublisher = hunPublisher;
    if (language) comic.language = language;
    if (pageNumber) comic.pageNumber = parseInt(pageNumber, 10);
    if (genre) comic.genre = Array.isArray(genre) ? genre : [genre];
    if (releaseYear) comic.releaseYear = parseInt(releaseYear, 10);
    if (writer) comic.writer = Array.isArray(writer) ? writer : [writer];
    if (illustrations) comic.illustrations = Array.isArray(illustrations) ? illustrations : [illustrations];
    if (colorist) comic.colorist = Array.isArray(colorist) ? colorist : [colorist];
    if (translator) comic.translator = Array.isArray(translator) ? translator : [translator];
    if (rating) comic.rating = parseFloat(rating);

    // Ha új kép érkezik, töröljük a régit, és állítsuk be az újat
    if (req.files && req.files['coverImage']) {
      const newCoverImageId = req.files['coverImage'][0].id;

      // Töröljük a régi képet a GridFS-ből
      if (comic.coverImage) {
        await deleteFile(comic.coverImage);
      }

      comic.coverImage = newCoverImageId;
    }

    // Mentés
    const updatedComic = await comic.save();
    res.status(200).json(updatedComic);
  } catch (err) {
    console.error('Error updating comic:', err);
    res.status(500).json({ message: 'Failed to update comic', error: err.message });
  }
};



const deleteComic = async (req, res) => {
  try {
    const { id } = req.params;

    const comic = await Comic.findById(id);

    if (!comic) {
      return res.status(404).json({ message: 'Comic not found' });
    }

    // Töröljük a kapcsolódó képet
    if (comic.coverImage) {
      await deleteFile(comic.coverImage);

    }

    // Töröljük a képregényt
    await comic.remove();

    res.status(200).json({ message: 'Comic deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { createComic, updateComic, deleteComic, getAllComics, getComicById };
