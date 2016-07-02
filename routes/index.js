var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Awesome Moonki Webapp' });
});

router.get('/health', function (req, res) {

  res.send({ server: 'Moonki Webapp', status: 'true', vir: '0.1', ip: req.connection.remoteAddress });
});

module.exports = router;
