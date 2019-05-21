var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donationSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: 'User', required: true },
    campaignId: { type: Schema.ObjectId, ref: 'Campaign', required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: 'in processing' }
  },
  { collection: 'donationCollection' }
);

module.exports = mongoose.model('Donation', donationSchema);
