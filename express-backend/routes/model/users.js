const mongoose = require('mongoose');
const PassportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: String,
  fullname: String,
  email: String,
  password: String,
  phone: String,
  is_admin: Boolean,
  role: {
    type: String,
    enum: ['User', 'Admin'],
    required: true,
  },
  avatar: String,
  is_banned: {
    type: Boolean,
    default: false,
  },
});

UserSchema.plugin(PassportLocalMongoose);


const User = mongoose.model('User', UserSchema);
module.exports = User;
