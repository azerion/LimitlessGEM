var LimitGEM = require('./lib/limitless'),
    RGBW = require('./lib/commands/rgbw');

var client = new LimitGEM.LimitlessLED('192.168.1.105', '8899');

var cmd = process.argv[2];

if (cmd == 'on') {
    client.send(RGBW.ZONE_1_ON);
    client.send(RGBW.ZONE_1_ON);
    client.send(RGBW.ZONE_1_ON);
    client.send(RGBW.ZONE_1_ON);
} else {
    client.send(RGBW.ZONE_1_OFF);
    client.send(RGBW.ZONE_1_OFF);
    client.send(RGBW.ZONE_1_OFF);
    client.send(RGBW.ZONE_1_OFF);
}