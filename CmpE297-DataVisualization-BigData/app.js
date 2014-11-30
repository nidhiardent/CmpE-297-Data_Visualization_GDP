
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var ejs = require("ejs");
var request = require("request");


var app = express();

//Hadoop
var hadoop = require("./routes/hadoop");
var mongo_hd = require("./routes/mongo_hadoop");
var md = require("./routes/mongo");

//all environments
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
app.get('/mongo', md.mongo);
//Only Hadoop
app.get('/hadoop', hadoop.fetchData);
//Mongo + Hadoop
app.get('/mongo_hadoop', mongo_hd.mongo_hadoop);


//Home Page
app.get('/', function(req, res){
	res.render('index');
});
app.get('/index', function(req, res){
	res.render('index');
});
//Chart page
app.get('/chart', function(req, res){
	res.render('chart');
});

//icon Page
app.get('/icon', function(req, res){
	res.render('icon');
});

//table Page
app.get('/table', function(req, res){
	res.render('table');
});

//typography Page
app.get('/typography', function(req, res){
	res.render('typography');
});

//UI Page
app.get('/ui', function(req, res){
	res.render('ui');
});

//widget Page
app.get('/widgets', function(req, res){
	res.render('widgets');
});

//Create Server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
