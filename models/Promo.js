const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PromoSchema = new Schema({
  imgUrl: String,
  desc: String,
  cakesId: {
    type: Schema.Types.ObjectId,
    ref: 'Cake'
  }
})

module.exports = mongoose.model('Promo', PromoSchema);
