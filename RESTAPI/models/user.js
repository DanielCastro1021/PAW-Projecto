var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' }
  },
  { collection: 'userCollection' }
);
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
