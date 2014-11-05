var express = require('express');
var app = express();

var http = require('http').Server(app);

var db = require('./db');
require('./routing')(express, app);

http.listen(3000, function () {
    console.log('listening at http://localhost:3000');
    db.connect(function() {
        console.log("Connected to the database");
    });
});
