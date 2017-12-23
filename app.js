var express = require('express');
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

var port = process.env.PORT || 8081;

server.listen(port);

});

io.sockets.on('connection', function(socket)
{
    console.log("Client has connected :)");
    console.log("Connected clients: " + Object.keys(io.sockets.sockets).length);
    console.log(new Date(dt.now()));

    socket.on('disconnect', function() {
    console.log("Client has disconnected :(");
    console.log("Connected clients: " + Object.keys(io.sockets.sockets).length);
    console.log(new Date(dt.now()));
    });

    socket.on('cb01', function (data)
    {
    console.log(data.status);
    io.sockets.emit('cb01', {status: data.status});
    });


    socket.on('ledAGS', function(data)
  {
    console.log(data);
    io.sockets.emit('ledAGS', {status: data.status});
  });

});
