var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var moment = require('moment');
var Q = require('q');

var url = 'mongodb://localhost:27017/viacaopiraju';

var findAllDocuments = function(db, callback) {
	var cursor = db.collection('idosos').find();

	cursor.sort({'nome': 1})
	.toArray(function(err, docs) {
		assert.equal(err, null);

		callback(docs);
	});
};

var aggregateAll = function(db, callback) {
	db.collection('idosos')
	.count(function(err, result) {
		assert.equal(err, null);
		
		callback(result);
   });
};

var insertOneDocument = function(newDoc, db, callback) {
	db.collection('idosos')
	.insertOne(newDoc, function(err, result) {
		assert.equal(err, null);
		
		callback(result);
   });
};


exports.countAll = function() {
	var def = Q.defer();

	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  aggregateAll( db, function(result) {
		db.close();
		def.resolve(result);
	  });
	});
	return def.promise;
};

exports.getAll = function() {
	var def = Q.defer();

	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  findAllDocuments( db, function(result) {
		db.close();
		def.resolve(result);
	  });
	});
	return def.promise;
};

exports.insertOne = function(doc) {
	var def = Q.defer();

	var newDoc = {
		"nome"				: doc.nome,
	    "endereco"			: doc.endereco,
	    "rg"				: doc.rg,
	    "dt_nascimento"		: moment(doc.dt_nascimento, 'MM/DD/YYYY').toDate(),
	    "dt_validade"		: moment(doc.dt_validade, 'MM/DD/YYYY').toDate(),
	    "deficiente"		: (doc.deficiente == 'true'),
	    "cid"				: (typeof doc.cid == 'string' && doc.cid != '') ? doc.cid : null,
	    "photo"				: (typeof doc.photo == 'string' && doc.photo != '') ? doc.photo : null
	};

console.log('newDoc: ', newDoc);
	
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  insertOneDocument(newDoc, db, function(result) {
		db.close();
		def.resolve(result);
	  });
	});
	return def.promise;
}