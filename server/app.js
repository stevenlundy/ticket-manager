var express = require('express');
var parser = require('body-parser');

var router = require('./routes');

var app = express();
app.set("port", 3000);
app.use(parser.json());
app.use("/api", router);
app.use(express.static(__dirname + "/../client"));
app.use("/lib", express.static(__dirname + "/../node_modules"));
app.get("/*", function(req, res) {
  res.sendFile("index.html", { root: __dirname + "/../client" });
})

app.listen(app.get("port"));
console.log("Listening on", app.get("port"));
