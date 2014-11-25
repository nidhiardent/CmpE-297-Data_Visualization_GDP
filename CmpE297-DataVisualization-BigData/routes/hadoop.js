
exports.fetchData = function(req, res){

	require('timothy')
	.configure({
		hadoopHome: "/usr/local/hadoop",
		config: './hadoop.xml',
		input: "/user/loremipsum.txt",
		output: "/home/ankith/node_workspace/HelloMongo/node_modules/timothy/examples/processed_"+(new Date().getTime()),
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







	/*var WebHDFS = require('webhdfs');
	var hdfs = WebHDFS.createClient();
	var fs = require('fs');

	var localFilePath = "/home/ankith/data/shakespeare2.txt";
	var remoteFilePath = "/home/ankith/data/huckleberry2.txt";

	var localFileStream = fs.createReadStream(localFilePath);
	var remoteFileStream = hdfs.createWriteStream(remoteFilePath);

	console.log("localFileStream:::"+JSON.stringify(localFileStream));
	console.log("remoteFileStream:::"+JSON.stringify(remoteFileStream));

	localFileStream.pipe(remoteFileStream);

	console.log("opening stream to HDFS");

	remoteFileStream.on('error', function onError (err) {
		// Do something with the error
		console.log("it failed");
		console.log(err);
	});

	remoteFileStream.on('finish', function onFinish () {
		// Upload is done
		console.log("it is done!");
	});
	 */


	/*var hdfs = new (require("node-webhdfs")).WebHDFSClient({ user: process.env.USER, path_prefix:"/", namenode_host: "localhost", namenode_port: 50070 });
	var twitter = require("ntwitter");
	var SyncQueue = require("syncqueue");
	var hdfsFile = "/user/output/feed.txt";

	// make appending synchronous
	var queue = new SyncQueue();
	console.log("hdfs :::"+JSON.stringify(hdfs));
	//console.log("process.env.USER :::"+process.env.USER);

	// get your developer keys from: https://dev.twitter.com/apps/new
	var twit = new twitter({
		consumer_key: "0TIafcnbzh3pcrsZpCjHxzD9Q",
		consumer_secret: "aCtheVcvYC6INWqKJWRDYPQN0jPsjxhw4SDr44Jiq4mXvoavt9",
		access_token_key: "59748443-7JipHUevgoTiQHDqwL5Xt0pB4JtP7wIUroNb1rIos",
		access_token_secret: "qHRCzEO5cOY0TGHXYToCLS2B1varHyoADf8ld0ZEl4j1b"
	});

	twit.stream("statuses/filter", {"track":"hadoop,big data"}, function(stream) {
		stream.on("data", function (data) {
			queue.push(function(done) {
				console.log("Data :::"+data.text);
				hdfs.append(hdfsFile, JSON.stringify(data), function (err, success) {
					if (err instanceof Error) {
						console.log("HDFS Success:::"+success); 
						console.log("HDFS Error:::"+err);
					}
					done();
				});
			});
		});
	});*/


};

