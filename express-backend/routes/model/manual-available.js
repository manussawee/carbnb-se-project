const mongoose = require('mongoose');

const { Schema } = mongoose;

const ManualAvailableSchema = new Schema({
  id: String,
  started_at: Date,
  ended_at: Date,
});

const ManualAvailable = mongoose.model('ManualAvailable', ManualAvailableSchema);
module.exports = ManualAvailable;
