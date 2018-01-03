var mqtt = require('mqtt')
client = mqtt.connect('mqtt://aqainmze:g4aN3MgGSwN8@localhost?clientId=abcde');
client.subscribe('esp/test');
client.publish('esp/test', 'Hello mqtt');
client.on('esp/test', function (topic, message) {
    console.log(message);
});
client.end();
