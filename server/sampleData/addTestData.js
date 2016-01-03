var models = require('../models');

var patrons = require('./patrons');
var orders = require('./orders');
var items = require('./items');

for (var i = 0; i < patrons.length; i++) {
  models.patrons.insert(patrons[i])
    .then(function(results) {
      console.log(results);
    })
    .catch(function(err) {
      console.log(err);
    });
}
for (var i = 0; i < orders.length; i++) {
  models.orders.insert(orders[i])
    .then(function(results) {
      console.log(results);
    })
    .catch(function(err) {
      console.log(err);
    });
}
for (var i = 0; i < items.length; i++) {
  models.items.insert(items[i])
    .then(function(results) {
      console.log(results);
    })
    .catch(function(err) {
      console.log(err);
    });
}
