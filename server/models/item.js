const mongoose = require('mongoose');
const Schema = mongoose.Schema

const itemSchema = new Schema({
  judul: { type: String },
  penerbit: { type: String },
  penulis: { type: String },
  picture: { type: String }
},{
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;
