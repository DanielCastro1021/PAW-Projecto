var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donationSchema = new Schema(
  {
    username: { type: String, required: true },
    campainId: { type: Schema.Types.ObjectId, required: true, ref: 'Campaign' },
    amount: { type: Number, required: true },
    status: { type: Number, required: true, default: 'in processing' }
  },
  { collection: 'donationCollection' }
);

module.exports = mongoose.model('Donation', donationSchema);
