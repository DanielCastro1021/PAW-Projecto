var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String },
    fullname: { type: String, required: true },
    nif: { type: Number, min: 100000000, max: 999999999, required: true },
    iban: { type: String, required: true },
    role: { type: String, default: 'user' },
    coordinates: { latitude: Number, longitude: Number },
    address: { type: String }
  },

  { collection: 'userCollection' }
);

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
