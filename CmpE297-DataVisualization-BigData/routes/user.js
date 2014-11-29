
exports.mongo_hadoop = function(req, res){

	//Hadoop Map-Reduce
	require('timothy')
	.configure({
		hadoopHome: "/usr/local/hadoop",
		config: './hadoop.xml',
		input: "/user/loremipsum.txt",
		output: "/user/processed_"+(new Date().getTime()),
		name: "Timothy Word Count Example",
		cmdenv: "var=",
		"mapred.map.tasks": 10
	})
	.dependencies({"node-uuid":"1.3.3"})
	.setup(function() {
		x = 0;
		inc = function() {
			x = x + 1;
		};	
		var uuid =require('node-uuid');
		this.updateStatus("setup...");
	})
	.map(function(line){
		var words = line.split(" ");

		for(var i=0; i<words.length; i++) {
			this.updateStatus("mapping "+i);
			inc();
			this.emit(words[i], x);
		}
	})
	.reduce(function(word, counts){
		this.updateStatus("reducing "+word);
		this.emit(word, counts.length);
		//this.emit(uuid.v1(),"10000000");
	})
	.run(function(err){
		console.log("**FINISHED");
		if (err !== null)
			console.log(err);
	})
	//.runLocal("/home/ankith/node_workspace/HelloMongo/node_modules/timothy/examples/loremipsum.txt");

	console.log("I should be seen straight away!");

	//Getting File from HDFS output directory to local directory
	require('shelljs/global');
	var command2 = "/usr/local/hadoop/bin/hadoop fs -getmerge /user/processed_1412375805496 /home/ankith/node_workspace/CmpE297-DataVisualization-BigData/file.csv";
	exec(command2, function(e, stdout, stderr) {
		console.log("\n\n*** Command 2 OUTPUT:\n");
		console.log(stdout);
		
		console.log("*** Command 2 ERROR:\n");
		console.log(stderr);

		//cb(e, (e!==null ? "Error executing Hadoop command22222222222:\n"+command : null));
	});





	/*var WebHDFS = require('webhdfs');
	var hdfs = WebHDFS.createClient({
	  user: 'ankith',
	  host: 'localhost',
	  port: 9000,
	  path: '/'
	});

	var remoteFileStream = hdfs.createReadStream('/home/ankith/node_workspace/HelloMongo/node_modules/timothy/examples/processed_1412362287435');

	console.log("Error at Read:::"+JSON.stringify(remoteFileStream));
	remoteFileStream.on('error', function onError (err) {
	  // Do something with the error
		console.log("Error at Read:::"+err);
	});

	remoteFileStream.on('data', function onChunk (chunk) {
	  // Do something with the data chunk
		console.log("Data at Read:::"+chunk);
	});

	remoteFileStream.on('finish', function onFinish () {
	  // Upload is done
	});*/


};

exports.output_to_mongo = function(req, res){
//CSV TO JSON 
//Converter Class
var Converter=require("csvtojson").core.Converter;

var fs=require("fs");
//CSV File Path or CSV String or Readable Stream Object
var csvFileName="/home/ankith/node_workspace/CmpE297-DataVisualization-BigData/file.csv";

//new converter instance
var csvConverter=new Converter();

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){

	console.log(jsonObj); //result json object
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

		//Insert Operation
		collection.insert(jsonObj, {w:1}, function(err, result) {});


	});

	
});
//read from file
fs.createReadStream(csvFileName).pipe(csvConverter);
};
