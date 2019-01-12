const mongoose = require('mongoose');

const { Schema } = mongoose;

const CarImageSchema = new Schema({
  id: String,
  image_url: String,
  alt: String,
});

const CarImage = mongoose.model('CarImage', CarImageSchema);
module.exports = CarImage;
