const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();

let gfs;
let gridfsBucket;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // GridFSBucket inicializálása a fájlokhoz
    gridfsBucket = new GridFSBucket(conn.connection.db, {
      bucketName: 'uploads', // A "uploads" bucket fogja tárolni a képeket
    });

    gfs = gridfsBucket;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Kilépés hibás kapcsolat esetén
  }
};

module.exports = { connectDB, gfs, gridfsBucket };
