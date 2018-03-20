const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  email: String,
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema);
