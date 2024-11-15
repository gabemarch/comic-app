const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const dotenv = require('dotenv');
dotenv.config();

// GridFS tároló konfiguráció
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => ({
    filename: `${Date.now()}-${file.originalname}`,
    bucketName: 'uploads' // A bucket neve
  })
});

const upload = multer({ storage });

// Feltöltés vezérlő (middleware)
const uploadSingle = upload.fields([
  { name: 'coverImage', maxCount: 1 }
]);

module.exports = { uploadSingle };
