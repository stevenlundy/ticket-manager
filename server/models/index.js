var query = require('../db').query;

module.exports = {
  patrons: {
    getAll: function() {
      var queryString = "SELECT * FROM patrons";
      var queryArgs = [];
      return query(queryString, queryArgs);
    },
    getOne: function(patron_number) {
      var queryString = "SELECT * FROM patrons WHERE patron_number = ?";
      var queryArgs = [patron_number];
      return query(queryString, queryArgs);
    },
    getOrders: function(patron_number) {
      var patronOrders = {};
      var queryString = "SELECT * FROM orders WHERE patron_number = ?";
      var queryArgs = [patron_number];
      return query(queryString, queryArgs)
        .then(function(orders) {
          var queries = [];
          orders.forEach(function(order) {
            patronOrders[order.id] = order;
            queries.push(query("SELECT * FROM order_items WHERE order_id = ?", [order.id]));
            queries.push(query("SELECT * FROM donations WHERE order_id = ?", [order.id]));
          });
          return Promise.all(queries);
        })
        .then(function(results) {
          for (var i = 0; i < results.length; i += 2) {
            var orderItems = results[i];
            var donations = results[i + 1];
            orderItems.forEach(function(item) {
              var items = patronOrders[item.order_id].items || [];
              items.push(item);
              patronOrders[item.order_id].items = items;
            });
            donations.forEach(function(donation) {
              patronOrders[donation.order_id].donation = donation.amount;
            });
          }
          return patronOrders;
        });
    },
    insert: function(data) {
      var queryString = "INSERT INTO patrons SET ?";
      var queryArgs = data;
      return query(queryString, queryArgs);
    },
    update: function(patron_number, data) {
      var queryString = "UPDATE patrons SET ? WHERE patron_number = ?";
      var queryArgs = [data, patron_number];
      return query(queryString, queryArgs);
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
    update: function(sku, data) {
      var queryString = "UPDATE items SET ? WHERE sku = ?";
      var queryArgs = [data, sku];
      return query(queryString, queryArgs);
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
