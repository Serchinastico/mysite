var express = require('express');
var Log = require('log-color');

var app = express();
var log = new Log({level: 'debug', color: true});

app.use(express.static('../webclient'));

app.get('/', function(req, res) {
	res.sendFile('../webclient/index.html');
});

var server = app.listen(8000, function() {
	var host = server.address().address;
	var port = server.address().port;

	log.debug('Server listening at http://' + host + ':' + port);
});