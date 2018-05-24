const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ulasanSchema = new Schema({
  UserId: { type: String },
  ulasan: { type: String },
  BookId: { type: String }
},{
  timestamps: true
})

const Ulasan = mongoose.model('Ulasan', itemSchema)

module.exports = Ulasan;
