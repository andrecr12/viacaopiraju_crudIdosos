var express = require('express');
var router = express.Router();

var idoso = require('../models/idoso');

var pagesConfig = [{
    page: 'index',
    label: 'Início',
    href: '/'
  },{
    page: 'createPerson',
    label: 'Novo Cadastro',
    href: '/createPerson'
  },{
    page: 'readPerson',
    label: 'Consultar cadastro',
    href: '/readPerson'
}];



/* GET home page. */
router.get('/', function(req, res) {

  idoso.countAll()
  .then(function(total){
    return [total, idoso.getAll()]
  })
  .spread(function(total, idosos){
    
    res.render('index', {
    	page: 'index',
    	navMenu: pagesConfig,
      totalNumber: total,
      people: idosos
    });
  });
});

router.get('/createPerson', function(req, res) {
  res.render('createPerson', {
  	page: 'createPerson',
  	navMenu: pagesConfig
  });
});

router.get('/readPerson', function(req, res) {
  res.render('readPerson', {
  	page: 'readPerson',
  	navMenu: pagesConfig
  });
});

module.exports = router;