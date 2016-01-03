var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "epo_orders",
});

dbConnection.connect();

var query = function(queryString, queryArgs) {
  return new Promise(function (resolve, reject) {
    dbConnection.query(queryString, queryArgs, function(err, results) {
      if(err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  db: dbConnection,
  query: query
};

