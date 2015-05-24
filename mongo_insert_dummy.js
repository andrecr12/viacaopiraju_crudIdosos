var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/viacaopiraju';

var dummy_data = [{
    "nome": "André Carrasco Rodrigues",
    "endereco": "Rua Ouvidor Peleja, 779, apto 61",
    "rg": "34.303.819-5",
    "dt-nascimento": new Date("1988-12-07"),
    "dt-validade": new Date("2015-12-31"),
    "deficiente": false,
    "cid": null,
    "photo": null
  }, {
    "nome": "Andressa Carrasco Rodrigues",
    "endereco": "Rua João Ignácio Ferreira de Campos, 56",
    "rg": "34.303.820-1",
    "dt-nascimento": new Date("1990-11-14"),
    "dt-validade": new Date("2015-11-30"),
    "deficiente": false,
    "cid": null,
    "photo": null
  }, {
    "nome": "Maria José Carrasco Rodrigues",
    "endereco": "Rua Dionisio Hernandes, 100",
    "rg": "14.145.193-2",
    "dt-nascimento": new Date("1965-08-13"),
    "dt-validade": new Date("2016-01-31"),
    "deficiente": false,
    "cid": null,
    "photo": null
}];


var insertDocument = function(db, callback) {
   db.collection('idosos').insertMany( dummy_data, function(err, result) {
    assert.equal(err, null);
    console.log("Dummy data inserido com sucesso em 'idosos'");
    callback(result);
  });
};



MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument( db, function() {
  	db.close();
  });
});