const mongoose = require('mongoose');
const Book = require('../models/book')
const jwt = require('jsonwebtoken');

module.exports = {

  addNewBook(req, res){

    const newBook = {
      judul: req.body.judul,
      penerbit: req.body.penerbit,
      penulis: req.body.penulis,
      picture: req.file.cloudStoragePublicUrl
    }

    Book.create(newBook, function(err, success) {
      if (err) {
        res.status(404).json('bad request')
      } else {
        res.status(201).json('success add new item');
      }
    })
  }

};
