var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    campainId: { type: Schema.Types.ObjectId, required: true, ref: 'Campain' },
    amount: { type: Number, required: true },
    status: { type: Number, required: true, default: 'in processing' }
  },
  { collection: 'donationCollection' }
);

module.exports = mongoose.model('Donation', donationSchema);
