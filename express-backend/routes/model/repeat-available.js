const mongoose = require('mongoose');

const { Schema } = mongoose;

const RepeatAvailableSchema = new Schema({
  id: String,
  days: Array,
});

const RepeatAvailable = mongoose.model('RepeatAvailable', RepeatAvailableSchema);
module.exports = RepeatAvailable;
