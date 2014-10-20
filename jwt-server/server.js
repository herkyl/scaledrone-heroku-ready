var express = require('express');
var jwt = require('jwt-simple');
var secret = process.env.SCALEDRONE_CHANNEL_SECRET || 'PChauccYbEMikeD3r9IB8ZKB2VfcFgYM';
var channel = process.env.SCALEDRONE_CHANNEL_ID || 'sqjF8fo3mC6YfcgO';
var port = process.env.PORT || 8080;
var app = express();
var request = require('request');

app.set('view engine', 'html');
app.engine('html', require('hogan-express'));

app.get('/', function(req, res) {
    res.render('../client/index', {
      channel: channel
    });
});

app.get('/rest', function(req, res) {
    var url = 'https://api2.scaledrone.com/' + channel + '/yo-room/publish';
    request.post(url, {
        json: { key: 'value' }
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(body);
        } else {
            res.status(500).send(error);
        }
    });
});

function hasChannelAccess(req) {
    return true;
}

app.get('/jwt', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*'); // for developing
    if (hasChannelAccess(req)) {
        console.log(req.query);
        var clientId = req.query.clientId,
            payload = {
                client: clientId, // the client that wants to connect
                channel: channel, // channel that the client want's to connect to
                permissions: {
                    '.*': { /* Regex matches everything */
                        publish: false, /* Forbids publishing to all channels */
                        subscribe: false /* Allows subscribing to all channels */
                    },
                    '^yo-room$': { /* Exact match to yo-room */
                        publish: true, /* Allows publishing in room1 */
                        subscribe: true
                    }
                },
                exp: Date.now() + 180000 // client can use this token for 3 minutes (UTC-0)
            },
            token = jwt.encode(payload, secret, 'HS256');
        res.send(token);
    } else {
        res.send(403, 'Sorry! You are not allowed.');
    }
});

console.log('Starting server on port %d', port);
app.listen(port);
console.log('Server is running..');
