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
    getAll: function() {
      var orderQuery = "SELECT * FROM orders";
      var orderItemQuery = "SELECT * FROM order_items";
      var donationQuery = "SELECT * FROM donations";

      var queries = []
      queries.push(query(orderQuery, []));
      queries.push(query(orderItemQuery, []));
      queries.push(query(donationQuery, []));

      return Promise.all(queries).then(function(results) {
        var orders = results[0];
        var orderItems = results[1];
        var donations = results[2];

        var results = {};
        orders.forEach(function(order) {
          results[order.id] = order;
        });
        orderItems.forEach(function(item) {
          var items = results[item.order_id].items || [];
          items.push(item);
          results[item.order_id].items = items;
        });
        donations.forEach(function(donation) {
          results[donation.order_id].donation = donation.amount;
        });
        return results;
      })
    },
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
            data.items.forEach(function(item) {
              queryArgs.push([orderId, item.item_sku, item.quantity]);
            });
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
