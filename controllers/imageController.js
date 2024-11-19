const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const conn = mongoose.createConnection(process.env.MONGO_URI);

let gfsBucket;

conn.once('open', () => {
  gfsBucket = new GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
});

const getCoverImage = async (req, res) => {
  try {
    const fileId = req.params.id;

    // Ellenőrizd, hogy az ID érvényes-e
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: 'Invalid file ID' });
    }

    const objectId = new mongoose.Types.ObjectId(fileId);

    // Keressük meg a fájlt a bucketből
    const file = await gfsBucket.find({ _id: objectId }).toArray();

    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'No file exists' });
    }

    const mimeType = file[0].contentType;

    // Ellenőrizzük, hogy a fájl képtípusú-e
    if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
      res.set('Content-Type', mimeType);
      const readstream = gfsBucket.openDownloadStream(objectId);
      readstream.pipe(res);
    } else {
      return res.status(404).json({ message: 'Not an image file' });
    }
  } catch (err) {
    console.error('Error in getCoverImage:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getCoverImage };
