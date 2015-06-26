var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/viacaopiraju';

var seq = {
  _id: "idosos",
  seq: 0
};


var insertCounter = function(db, callback) {
   db.collection('counters').insert( seq, function(err, result) {
    assert.equal(err, null);
    console.log("Counter inserido com sucesso para 'idosos'");
    callback(result);
  });
};



MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertCounter( db, function() {
  	db.close();
  });
});