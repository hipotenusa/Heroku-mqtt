var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://m23.cloudmqtt.com');
client.subscribe('esp/test');
client.publish('esp/test', 'Hello mqtt');
client.on('esp/test', function (topic, message) {
    console.log(message);
    client.end();
});

