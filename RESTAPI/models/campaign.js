var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//TODO: Missing restriction on contribuiters array min length = 1.
var campaignSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, min: 0.1, required: true },
    iban: { type: Number, required: true },
    contribuiters: {
      type: [{ type: String }],
      required: true
    }
  },
  { collection: 'campainCollection' }
);

module.exports = mongoose.model('Campain', campaignSchema);
