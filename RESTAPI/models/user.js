var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String },
    role: { type: String, default: 'user' },
    coordinates: { latitude: Number, longitude: Number },
    address: { type: String }
  },

  { collection: 'userCollection' }
);

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
