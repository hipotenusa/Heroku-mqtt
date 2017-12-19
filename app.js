var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('Public'));

app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Server running on http://%s:%s", host, port)

});


io.on('connection', function(socket)
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