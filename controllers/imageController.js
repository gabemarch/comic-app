const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const dotenv = require('dotenv');
dotenv.config();

const conn = mongoose.createConnection(process.env.MONGO_URI);

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const getCoverImage = (req, res) => {
  const fileId = req.params.id;

  gfs.files.findOne({ _id: mongoose.Types.ObjectId(fileId) }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'No file exists' });
    }

    // Ellenőrizd, hogy a fájl képtípusú-e
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      const readstream = gfs.createReadStream(file._id);
      readstream.pipe(res);
    } else {
      res.status(404).json({ message: 'Not an image file' });
    }
  });
};

module.exports = { getCoverImage };
