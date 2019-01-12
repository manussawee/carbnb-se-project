const mongoose = require('mongoose');

const { Schema } = mongoose;

const BrandSchema = new Schema({
  id: String,
  name: String,
  logo_image_url: String,
});

const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand;
