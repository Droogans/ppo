var express = require('express'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'server')));

app.get('/', function (req, res) {
  res.sendFile(__dirname+ '/index.html');
});

module.exports = app;
