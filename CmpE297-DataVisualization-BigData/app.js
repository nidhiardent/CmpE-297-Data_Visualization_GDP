
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
var plotLineGraph = require("./routes/plotLineGraph");
var world_gdp = require("./routes/world_gdp");

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
app.get('/about', function(req, res){
	res.render('about');
});

//table Page
app.get('/table', function(req, res){
	res.render('table');
});

//typography Page
app.get('/feature', function(req, res){
	res.render('feature');
});

//UI Page
app.get('/world_gdp', world_gdp.getDefaultGDP);

app.post('/process_world_gdp', world_gdp.getGDPDetails);

//widget Page
app.get('/line_graph_gdp', function(req, res){
	res.render('line_graph_gdp');
});

//widget Page
app.get('/top_countries_gdp', function(req, res){
	res.render('top_countries_gdp');
});

//widget Page
app.get('/line', plotLineGraph.plotLine);

//Hadoop page
app.get('/submenu', function(req, res){
	res.render('hadoop');
});

//Bootstrap Page
app.get('/submenu2', function(req, res){
	res.render('bootstrap');
});

//D3 Page
app.get('/submenu3', function(req, res){
	res.render('d3');
});

//Create Server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
