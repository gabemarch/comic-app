// models/Comic.js
const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
  originalTitle: {
    type: String,
    required: true,
  },
  translatedTitle: {
    type: String
  },
  publisher: {
    type: String,
    required: true,
  },
  hunPublisher: {
    type: String,
  },
  language: {
    type: String,
    required: true
  },
  pageNumber: {
    type: Number,
    required: true
  },
  genre: {
    type: Array,
    required: true,
  },
  releaseYear: {
    type: Number,
  },
  writer: {
    type: String || Array,
    required: true
  },
  illustrations: {
    type: String || Array,
    required: true
  },
  colorist: {
    type: String || Array
  },
  translator: {
    type: String || Array
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      comment: String,
      rating: Number,
    },
  ],
  coverImage: mongoose.Schema.Types.ObjectId,
});

const Comic = mongoose.model('Comic', comicSchema);

module.exports = Comic;
