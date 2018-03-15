const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CarouselSchema = new Schema({
  imgUrl: String,
  class: String,
  cakesId: {
    type: Schema.Types.ObjectId,
    ref: 'Cake'
  }
})

module.exports = mongoose.model('Carousel', CarouselSchema);
