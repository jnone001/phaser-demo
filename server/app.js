var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || 5005;

app.use(express.static(__dirname+ '/../client'));

app.get('/', function(request, response){
	response.sendFile(path.resolve(__dirname + '/../client/game.html'));
});

app.listen(port);