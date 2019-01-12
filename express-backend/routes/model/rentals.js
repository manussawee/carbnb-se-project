const mongoose = require('mongoose');

const { Schema } = mongoose;

const RentalSchema = new Schema({
  lessee_id: { type: Schema.Types.ObjectId, ref: 'User' },
  lessor_id: { type: Schema.Types.ObjectId, ref: 'User' },
  car_id: { type: Schema.Types.ObjectId, ref: 'Car' },
  started_at: Date,
  ended_at: Date,
  updated_at: { type: Date, default: Date.now() },
  price: Number,
  deposit: Number,
  status: String,
  payment_ref: String,
});

const Rental = mongoose.model('Rental', RentalSchema);
module.exports = Rental;
