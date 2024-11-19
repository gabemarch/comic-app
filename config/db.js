const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();

let gfs;
let gridfsBucket;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    gridfsBucket = new GridFSBucket(conn.connection.db, {
      bucketName: 'uploads',
    });

    gfs = gridfsBucket;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, gfs, gridfsBucket };
