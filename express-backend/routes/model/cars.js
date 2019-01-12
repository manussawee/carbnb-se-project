const mongoose = require('mongoose');

const { Schema } = mongoose;

const CarSchema = new Schema({
  id: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  brand_id: String,
  type: String,
  model: String,
  title: String,
  location: String,
  description: String,
  status: String,
  is_banned: { type: Boolean, default: false },
  price: Number,
  available_type: String,
  manual_available_id: { type: Schema.Types.ObjectId, ref: 'ManualAvailable' },
  repeat_available_id: { type: Schema.Types.ObjectId, ref: 'RepeatAvailable' },
  car_image_ids: [{ type: Schema.Types.ObjectId, ref: 'CarImage' }],
});

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
