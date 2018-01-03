var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://aqainmze:g4aN3MgGSwN8@m23.cloudmqtt.com?clientId=abcde');
client.subscribe('esp/test');
client.publish('esp/test', 'Hello mqtt');
client.on('esp/test', function (topic, message) {
    console.log(message);
});
client.end();
