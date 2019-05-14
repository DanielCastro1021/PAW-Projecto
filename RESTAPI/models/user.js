var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
    /*,
    iban: { type: String, required: true },
    nif: { type: Number, min: 100000000, max: 999999999, required: true },
    fullname: { type: String, required: true },
    location: {
      type: {
        coordinates: { type: { latitude: Number, longitude: Number } },
        address: { type: String }
      },
      required: true
    }*/
  },
  { collection: 'userCollection' }
);

module.exports = mongoose.model('User', userSchema);
