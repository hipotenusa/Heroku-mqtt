var express = require('express');
var app = express();

var server = require('http').Server(app);
var io =require('socket.io')(server);

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 1234;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

server.listen(port, function() {
  //var host = http.address().address
  //var port = http.address().port
  //console.log("Server running on http://%s:%s", host, port)
});
