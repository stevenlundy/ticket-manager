var query = require('../db').query;

module.exports = {
  patrons: {
    getAll: function() {
      var queryString = "SELECT * FROM patrons";
      var queryArgs = [];
      return query(queryString, queryArgs);
    },
    insert: function(data) {
      var queryString = "INSERT INTO patrons SET ?";
      var queryArgs = data;
      return query(queryString, queryArgs);
    },
    update: function(data) {

    }
  },
  items: {
    getAll: function() {
      var queryString = "SELECT * FROM items";
      var queryArgs = [];
      return query(queryString, queryArgs);
    },
    insert: function(data) {
      var queryString = "INSERT INTO items SET ?";
      var queryArgs = data;
      return query(queryString, queryArgs);
    },
    update: function(data) {

    }
  },
  orders: {
    insert: function(data) {
      var queryString = "INSERT INTO orders (patron_number, order_type, date_purchased, new) VALUES (?, ?, ?, ?)";
      var queryArgs = [data.patron_number, data.order_type, data.date_purchased, data.new];
      var orderId;

      return query(queryString, queryArgs)
        .then(function(results) {
          orderId = results.insertId
          if(data.items) {
            var queryString = "INSERT INTO order_items (order_id, item_sku, quantity) VALUES ?";
            var queryArgs = [];
            for (var i = 0; i < data.items.length; i++) {
              queryArgs.push([orderId, data.items[i].item_sku, data.items[i].quantity]);
            }
            return query(queryString, [queryArgs]);
          } else {
            return results;
          }
        })
        .then(function(results){
          if (data.donation) {
            var queryString = "INSERT INTO donations (order_id, amount) VALUES (?, ?)";
            var queryArgs = [orderId, data.donation];
            return query(queryString, queryArgs);
          } else {
            return results
          }
        });
    }
  }
};
