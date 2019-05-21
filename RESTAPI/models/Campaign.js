var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, min: 0.1, required: true },
    iban: { type: Number, required: true },
    contribuiters: [{ type: Schema.ObjectId, ref: 'User', required: true }]
  },
  { collection: 'campaignCollection' }
);

module.exports = mongoose.model('Campaign', campaignSchema);
