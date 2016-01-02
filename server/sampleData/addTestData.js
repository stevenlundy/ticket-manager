var models = require('./models');

var patrons = require('./sampleData/patrons');
var orders = require('./sampleData/orders');
var items = require('./sampleData/items');

for (var i = 0; i < patrons.length; i++) {
  models.patrons.insert(patrons[i], function(err, results) {
    if(err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
}
for (var i = 0; i < orders.length; i++) {
  models.orders.insert(orders[i], function(err, results) {
    if(err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
}
for (var i = 0; i < items.length; i++) {
  models.items.insert(items[i], function(err, results) {
    if(err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
}
