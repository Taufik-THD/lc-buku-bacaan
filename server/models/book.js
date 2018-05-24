const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookSchema = new Schema({
  judul: { type: String },
  penerbit: { type: Number },
  penulis: { type: Number },
  picture: { type: String }
},{
  timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book;
