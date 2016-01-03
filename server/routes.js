var router = require('express').Router();
var models = require('./models');

router.get('/patrons', function(req, res) {
  models.patrons.getAll().then(function(patrons) {
    res.status(200).send(patrons);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});
router.get('/patrons/:patron_number', function(req, res) {
  models.patrons.getOne(req.params.patron_number).then(function(patron) {
    res.status(200).send(patron[0]);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});
router.get('/patrons/:patron_number/orders', function(req, res) {
  models.patrons.getOrders(req.params.patron_number).then(function(orders) {
    res.status(200).send(orders);
  }).catch(function(err) {
    res.status(400).send(err);
  });
});
router.post('/patrons', function(req, res) {
  models.patrons.insert(req.body).then(function(patrons) {
    res.status(201).send('Created');
  }).catch(function(err) {
    res.status(400).send(err);
  });
});
router.post('/patrons/:type', function(req, res) {
  models.patrons.getNextPatronNumber(req.params.type)
    .then(function(patron_number) {
      req.body.patron_number = patron_number;
      return models.patrons.insert(req.body);
    })
    .then(function(patrons) {
      res.status(201).send('Created');
    }).catch(function(err) {
      res.status(400).send(err);
    });
});
router.put('/patrons/:patron_number', function(req, res) {
  models.patrons.update(req.params.patron_number, req.body).then(function(patrons) {
    res.status(202).send('Updated');
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
router.post('/items', function(req, res) {
  models.items.insert(req.body).then(function(items) {
    res.status(201).send('Created');
  }).catch(function(err) {
    res.status(400).send(err);
  });
});
router.put('/items/:sku', function(req, res) {
  models.items.update(req.params.sku, req.body).then(function(items) {
    res.status(202).send('Updated');
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
router.post('/orders', function(req, res) {
  models.orders.insert(req.body).then(function(orders) {
    res.status(201).send('Created');
  }).catch(function(err) {
    res.status(400).send(err);
  });
});

module.exports = router;
