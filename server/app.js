var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || 5005;

app.use(express.static(__dirname + '/../client'));
app.use("/client/plat/assets", express.static(__dirname + '/../client/plat/assets'));
app.use("/client/top-down/assets", express.static(__dirname + '/../client/top-down/assets'));

app.get('/', function (request, response) {
    response.sendFile(path.resolve(__dirname + '/../client/index.html'));
});
app.get('/plat', function (request, response) {
    response.sendFile(path.resolve(__dirname + '/../client/plat/plat.html'));
});
app.get('/top-down', function(request, response){
	response.sendFile(path.resolve(__dirname + '/../client/top-down/top-down.html'));
});

app.listen(port);