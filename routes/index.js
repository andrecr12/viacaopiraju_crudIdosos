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
			people: idosos,
			scripts: [
				'/js/lib/jquery-2.1.4.js',
				'/js/home.js'
			],
			css: []
		});
	});
});

router.get('/createPerson', function(req, res) {
	res.render('createPerson', {
		page: 'createPerson',
		navMenu: pagesConfig,
		scripts: [
			'/js/lib/jquery-2.1.4.js',
			'/js/lib/jquery-ui.min.js',
			'/js/lib/masked-input-plugin.js',
			'/js/form-control.js'
		],
		css: [
			'/css/jquery-ui.css'
		]
	});
});

router.post('/createPerson', function(req, res){
	
	idoso.insertOne(req.body)
	.done(function(){
		res.json({ success: true });
	});
});

router.get('/readPerson', function(req, res) {
	res.render('readPerson', {
		page: 'readPerson',
		navMenu: pagesConfig,
		scripts: [],
		css: []
	});
});

router.param('num_id', function(req, res, next, num_id){
	idoso.selectOne({'num_id' : num_id})
	.done(function(doc){
		console.log('Encontrado registro ', doc);
		// req.doc = 
		next();
	});
});

router.get('/readPerson/:num_id', function(req, res) {
	res.render('readPerson', {
		page: 'readPerson',
		navMenu: pagesConfig,
		scripts: [],
		css: []
	});
});

module.exports = router;