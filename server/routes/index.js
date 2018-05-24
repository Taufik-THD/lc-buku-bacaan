'use strict'
const express = require('express')
const router = express.Router()
const images = require('../helpers/images')
const multer = require('multer');

const { sendUploadToGCS } = require('../middlewares/uploadGcs');

const { Login, Register } = require('../controllers/user_controller.js')

const { addNewBook, getAllBook, openBook, tambahUlasan } = require('../controllers/book_controller.js')

const upload = multer({
 storage  : multer.memoryStorage(),
 limits   : {
   fileSize: 10*1024*1024
   }
})

/* GET home page. */
router.get('/', getAllBook)

router.post('/login', Login ),

router.post('/register', Register)

router.post('/upload', upload.single('item'), sendUploadToGCS, addNewBook)

router.get('/openbook/:id', openBook)

router.get('/ulasan/:id', (req, res) => {
  console.log('ulasan');
})

module.exports = router;
