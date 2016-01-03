var router = require('express').Router();
var models = require('./models');

router.get('/patrons', function(req, res) {
  models.patrons.getAll().then(function(patrons) {
    res.status(200).send(patrons);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});


router.get('/items', function(req, res) {
  models.items.getAll().then(function(items) {
    res.status(200).send(items);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});


router.get('/orders', function(req, res) {
  models.orders.getAll().then(function(orders) {
    res.status(200).send(orders);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

module.exports = router;