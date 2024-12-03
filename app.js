const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const comicRoutes = require('./routes/comicRoutes');
const imageRoutes = require('./routes/imageRoutes');
const writerRoutes = require('./routes/writerRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/comics', comicRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/writers', writerRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
