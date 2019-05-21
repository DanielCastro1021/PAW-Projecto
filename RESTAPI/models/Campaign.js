var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, min: 0.1, required: true },
    currentAmount: { type: Number, default: 0.0 },
    iban: { type: Number, required: true },
    responsibles: [{ type: String, required: true }]
  },
  { collection: 'campaignCollection' }
);

module.exports = mongoose.model('Campaign', campaignSchema);
