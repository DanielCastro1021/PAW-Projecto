var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, min: 0.1, required: true },
    currentAmount: { type: Number, default: 0.0 },
    iban: { type: String, required: true },
    logo: { type: String, required: true },
    responsibles: [{ type: String, required: true }],
    status: { type: String, default: 'active' }
  },
  { collection: 'campaignCollection' }
);

module.exports = mongoose.model('Campaign', campaignSchema);
