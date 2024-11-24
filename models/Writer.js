const mongoose = require('mongoose');
const writerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  thumbnail: {
    type: String, // Kép URL vagy fájl elérési útja
  },
  comics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comic', // A Comic modell referenciája
    },
  ],
});

const Writer = mongoose.model('Writer', writerSchema);
module.exports = Writer;
