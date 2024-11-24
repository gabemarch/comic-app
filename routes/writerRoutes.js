const express = require('express');
const router = express.Router();
const writerController = require('../controllers/writerController');


// Új író létrehozása
router.post('/', writerController.createWriter);

// Összes író lekérése
router.get('/', writerController.getWriters);

// Egy író lekérése ID alapján
router.get('/:id', writerController.getWriterById);

// Író frissítése
router.put('/:id', writerController.updateWriter);

// Író törlése
router.delete('/:id', writerController.deleteWriter);

module.exports = router;
