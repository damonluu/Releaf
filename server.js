const mongo = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const userName = {
	'Anonymous Aloe': './public/img/releaf_icons-aloe',
	'Anonymous Clover': './public/img/releaf_icons-clover',
	'Anonymous Eucalyptus': './public/img/releaf_icons-clover',
	'Anonymous Evergreen': './public/img/releaf_icons-evergreen',
	'Anonymous Fern': './public/img/releaf_icons-fern',
	'Anonymous Maple': './public/img/releaf_icons-maple'
};
var bodyParser = require('body-parser');
app.use(bodyParser.json());




var Filter = require('bad-words'),
filter = new Filter();

server.listen(5000);

app.use(
	express.static(__dirname + '/public', {
		extensions: ['html']
	})
);

var queue = [];
var ids = {};

var findMatch = function(socket) {
	// console.log(queue);
	if (queue.length > 0) {
		var other = queue.pop();
		console.log('socket ' + socket);
		console.log('mongo id: ' + ids[socket.id].mongoid);
		console.log('paired mongo id: ' + ids[other.id].pairedmongoid);
		socket.emit('start chat', ids[other.id]);
		other.emit('start chat', ids[socket.id]);
	} else {
		queue.push(socket);
		console.log('WAITING');
	}
};

// Connect to mongodb
var url = 'mongodb://localhost:27017/releaf';
var myDb;
mongo.connect(url, function(err, database) {
	if (err) {
		throw err;
	}
	console.log('Connected to MongoDB...');
	// db = database;
	myDb = database.db('releaf');
	// myDb.collection('chats').insertOne({});
	// let user = myDb.collection('users');

	// app.post
});

app.post('/user', function(req, res) {
	console.log('Here');
	console.log(req.body);
	// myDb.collection('users').insertOne({});
	// let user = myDb.collection('users');

	myDb.collection('users').insert(req.body, function(err, result) {
		if(err) {
			res.send('Error in new user');
			throw err;
		} else {
			res.send('new user success');
		}
	})
})


// Connect to Socket.io
io.on('connection', function(socket) {
	console.log('User ' + socket.id + ' connected');

	socket.on('login', function(data) {
		console.log('mongoid login: ' + data.mongoid);
		console.log('pairedmongoid: ' + data.pairedmongoid);
		ids[socket.id] = data;
		findMatch(socket);
	});

	// socket.on('match',function(data){
	// 	var idA = '5a63f025bd382aa89ba5529a';
	// 	//
	// 	//Return idB -> best match
	// 	var idB = '5a63f025bd382aa89ba5529b';
	// 	//Create a collection with roomID first
	// 	//Change roomID and change status for both id
	// 	//Emit found message
	// 	io.emit('matched', res);
	// });

	// Handle input events
	socket.on('input', function(data) {
		//Data contains objectID
		let name = data.name;
		let message = data.message;
		//update chat var based on data.roomID

		// generate a random number between 0 - 5
		var num = Math.floor(Math.random() * 6);
		// Assign the random dispaly name to the user
		// var userDisplayName = userName.get(num);

		if (name == '' || message == '') {
			console.log('do nothing.');
		// 	sendStatus('Please enter a Name and Message');
		} else {
			data.message = filter.clean(data.message);
			// console.log(userDisplayName);
			io.emit('output', data);

			// Sent status object
			// sendStatus({
			// 	message: 'Message Sent',
			// 	clear: true
			// });
		}
	});
});
