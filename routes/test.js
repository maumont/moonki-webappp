var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('conection');
  console.log(req.query);
  res.send({ message: 'Moonki Webapp' });
});

module.exports = router;
