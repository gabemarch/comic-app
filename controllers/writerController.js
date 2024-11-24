const Writer = require('../models/Writer');

// Új író létrehozása
exports.createWriter = async (req, res) => {
  try {
    const { firstName, lastName, bio, thumbnail } = req.body; // Thumbnail mező hozzáadva
    const writer = new Writer({ firstName, lastName, bio, thumbnail });
    await writer.save();
    res.status(201).json(writer);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt az író létrehozásakor.' });
  }
};

// Írók listázása
exports.getWriters = async (req, res) => {
  try {
    const writers = await Writer.find().populate('comics'); // Kapcsolódó képregények betöltése
    res.json(writers);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt az írók lekérésekor.' });
  }
};

// Egy író lekérdezése az ID alapján
exports.getWriterById = async (req, res) => {
  try {
    const writer = await Writer.findById(req.params.id).populate('comics');
    if (!writer) {
      return res.status(404).json({ error: 'Író nem található.' });
    }
    res.json(writer);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt az író lekérésekor.' });
  }
};

// Író frissítése
exports.updateWriter = async (req, res) => {
  try {
    const { firstName, lastName, bio, thumbnail } = req.body; // Thumbnail mező kezelése
    const writer = await Writer.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, bio, thumbnail },
      { new: true }
    );
    if (!writer) {
      return res.status(404).json({ error: 'Író nem található.' });
    }
    res.json(writer);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt az író frissítésekor.' });
  }
};

// Író törlése
exports.deleteWriter = async (req, res) => {
  try {
    const writer = await Writer.findByIdAndDelete(req.params.id);
    if (!writer) {
      return res.status(404).json({ error: 'Író nem található.' });
    }
    res.json({ message: 'Író törölve.' });
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt az író törlésekor.' });
  }
};