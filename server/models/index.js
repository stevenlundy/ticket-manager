var db = require('../db');

module.exports = {
  patrons: {
    getAll: function(callback) {
      var queryString = "SELECT * FROM patrons";
      var queryArgs = [];

      db.query(queryString, queryArgs, function(err, results){
        if(err){
          callback(err);
        } else {
          callback(null, results);
        }
      });
    },
    insert: function(data, callback) {
      var queryString = "INSERT INTO patrons SET ?";
      var queryArgs = data;

      db.query(queryString, queryArgs, function(err, results){
        if(err){
          callback(err);
        } else {
          callback(null, results);
        }
      });
    },
    update: function(data, callback) {

    }
  },
  items: {
    getAll: function(callback) {
      var queryString = "SELECT * FROM items";
      var queryArgs = [];

      db.query(queryString, queryArgs, function(err, results){
        if(err) {
          callback(err);
        } else {
          callback(null, results);
        }
      });
    },
    insert: function(data, callback) {
      var queryString = "INSERT INTO items SET ?";
      var queryArgs = data;

      db.query(queryString, queryArgs, function(err, results){
        if(err) {
          callback(err);
        } else {
          callback(null, results);
        }
      });
    },
    update: function(data, callback) {

    }
  },
  orders: {
    insert: function(data, callback) {
      var queryString = "INSERT INTO orders (patron_number, order_type, date_purchased, new) VALUES (?, ?, ?, ?)";
      var queryArgs = [data.patron_number, data.order_type, data.date_purchased, data.new];

      db.query(queryString, queryArgs, function(err, results) {
        if(err) {
          callback(err);
        } else {
          var orderId = results.insertId
          if(data.items) {
            var queryString = "INSERT INTO order_items (order_id, item_sku, quantity) VALUES ?";
            var queryArgs = [];
            for (var i = 0; i < data.items.length; i++) {
              queryArgs.push([orderId, data.items[i].item_sku, data.items[i].quantity]);
            }
            console.log(queryString);
            console.log(queryArgs);
          } else {
            var queryString = "DO 1"; // Do nothing
            var queryArgs = [];
          }
          db.query(queryString, [queryArgs], function(err, results) {
            if(err) {
              callback(err);
            } else if (data.donation) {
              var queryString = "INSERT INTO donations (order_id, amount) VALUES (?, ?)";
              var queryArgs = [orderId, data.donation];

              db.query(queryString, queryArgs, function(err, results) {
                if(err) {
                  callback(err);
                } else {
                  callback(null, results);
                }
              });
            } else {
              callback(null, results);
            }
          });
        }
      });
    }
  }
};
