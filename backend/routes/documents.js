var express = require('express');
var router = express.Router();
const connection = require("../conn");

/* GET users listing. */
router.get('/', function(req, res) {

  res.json('dokument routern');

});

module.exports = router;
