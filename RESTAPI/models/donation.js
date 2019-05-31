var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donationSchema = new Schema(
  {
    username: { type: String, required: true },
    campaign: { type: Schema.Types.ObjectId, required: true },
    amount: { type: Number, min: 0.1, required: true },
    status: { type: String, default: 'in processing' }
  },
  { collection: 'donationCollection' }
);

module.exports = mongoose.model('Donation', donationSchema);
