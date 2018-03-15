const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CakesSchema = new Schema({
  imgUrl: String,
  title: String,
  price: Number
})

module.exports = mongoose.model('Cake', CakesSchema);
