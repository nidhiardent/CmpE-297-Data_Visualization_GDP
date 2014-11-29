
/*
 * GET home page.
 */

exports.index = function(req, res){
	
	var MongoClient = require('mongodb').MongoClient;

	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/sample", function(err, db) {
		if(err) {
			return console.dir(err);
		}
		else {
			console.log("We are connected");
		}
		// Creating the collection. {strict:true} checks for the existing collection
		db.createCollection('test',{strict:true}, function(err, collection) {});
		
		var collection = db.collection('test');
		var doc1 = {'hello':'doc1'};
		var doc2 = {'hello':'doc2'};
		var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];
		//To make it simpler to the developer the driver implements the {w:1} options 
		//so that this is done automatically when inserting the document. 
		//{w:1} becomes especially important when you do update or remove as otherwise 
		//it’s not possible to determine the amount of documents modified or removed.
		
		//Insert Operation
		collection.insert(lotsOfDocs, {w:1}, function(err, result) {});
		
		//Fetch Operation
		collection.find().toArray(function(err, items) {
			console.log("Item ::::"+JSON.stringify(items));
		});
	});
	
	
	//Random Number Generation
	var randomnumber=Math.floor(Math.random()*1001);
	console.log("Generated Random Number: " +randomnumber);

	res.render('index',
			{title : title, data : data, random : randomnumber},
			function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
};