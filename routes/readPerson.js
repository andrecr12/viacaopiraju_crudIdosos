var express = require('express');
var router = express.Router();

router.get('/readPerson', function(req, res) {
  res.render('readPerson');
});

module.exports = router;