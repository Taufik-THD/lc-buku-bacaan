var express = require('express');
var router = express.Router();
const { Login, Register } = require('../controllers/user_controller.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', Login ),

router.post('/register', Register)

module.exports = router;
