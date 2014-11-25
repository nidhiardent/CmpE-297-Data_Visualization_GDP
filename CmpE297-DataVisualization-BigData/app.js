
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require("ejs");
var request = require("request");


var app = express();

//Hadoop
var hadoop = require("./routes/hadoop");
var mongo_hd = require("./routes/user");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//Only MongoDb
app.get('/', routes.index);
//Only Hadoop
app.get('/hadoop', hadoop.fetchData);
//Mongo + Hadoop
app.get('/user', mongo_hd.mongo_hadoop);
app.get('/output', mongo_hd.output_to_mongo);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});