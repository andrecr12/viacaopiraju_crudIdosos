var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
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