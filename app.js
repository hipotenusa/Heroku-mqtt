var express = require('express');
var http = require('http');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 1234;

// make express look in the public directory for assets (css/js/img)
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

app.listen(port, function() {
  //var host = http.address().address
  //var port = http.address().port
  //console.log("Server running on http://%s:%s", host, port)
});
