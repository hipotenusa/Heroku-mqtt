var express = require('express');
var app = express();
var server = require('http').Server(app);
var mqtt = require('mqtt');
var url = require('url');

// Parse
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'm14.cloudmqtt.com');
var auth = (mqtt_url.auth || ':').split(':');

// Create a client connection
var client = mqtt.createClient(13433, "m14.cloudmqtt.com", {
  username: "hvblvunn",
  password: "2eHyr5j9cSHI"
});

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 1234;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('esp/test', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });

  // publish a message to a topic
  client.publish('esp/test', 'my message', function() {
    console.log("Message is published");
    client.end(); // Close the connection when published
  });
});

server.listen(port, function() {
  //var host = http.address().address
  //var port = http.address().port
  //console.log("Server running on http://%s:%s", host, port)
});
