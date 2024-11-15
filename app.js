const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const comicRoutes = require('./routes/comicRoutes');
const imageRoutes = require('./routes/imageRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/comics', comicRoutes);
app.use('/api/images', imageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
