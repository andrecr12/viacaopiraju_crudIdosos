var express = require('express');
var router = express.Router();

router.get('/createPerson', function(req, res) {
  res.render('createPerson');
});

module.exports = router;