const mongoose = require('mongoose');
const Item = require('../models/item')
const jwt = require('jsonwebtoken');

module.exports = {

  addNewBook(req, res){

    const newBook = new Item ({
      judul: req.body.judul,
      penerbit: req.body.penerbit,
      penulis: req.body.penulis,
      picture: req.file.cloudStoragePublicUrl
    })

    Item.create(newBook, function(err, success) {
      if (err) {
        res.status(404).json('bad request')
      } else {
        res.status(201).json('success add new item');
      }
    })

  },

  getAllBook(req, res){
    Item.find({}, (err, data) => {
      res.status(200).json(data)
    })
  },

  openBook(req, res){

    const idBook = req.params.id

    Item.find({ _id: idBook }, (err, user) => {

      if (err) {
        console.log(err);
      } else {
        res.status(200).json(user)
      }

    })

  },

  tambahUlasan(req, res){
    console.log(req.body);
  }


};
