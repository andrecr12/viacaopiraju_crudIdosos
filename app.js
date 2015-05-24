var express = require('express');
var app = express();

app.locals.moment = require('moment');

// view engine setup
app.set('views', 'views');
app.set('view engine', 'jade');

app.use(express.static('public'));

app.use('/', require('./routes/index'));
// app.use('/createPerson', require('./routes/createPerson'));
// app.use('/readPerson', require('./routes/readPerson'));

/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

var server = app.listen(3001, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});