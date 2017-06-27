var express = require("express");
var app = express();

app.set("port",  5000);

app.get( '/', function(req, res) {
	res.send('Hello!');
});

app.listen(app.get("port"), function(){
  console.log("Listening on port: ", app.get("port"));
});
