var router = require('express').Router();

router.get('/test', function(req, res) {
  res.send('this is a test!');
})

module.exports = router;
