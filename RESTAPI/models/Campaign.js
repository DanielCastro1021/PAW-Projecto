var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//TODO: Missing restriction on contribuiters array min length = 1.
var campainSchema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, min: 0.1, required: true },
    iban: { type: Number, required: true },
    contribuiters: {
      type: [{ type: String }],
      required: true
    }
  },
  { collection: 'campaignCollection' }
);

module.exports = mongoose.model('Campain', campainSchema);
