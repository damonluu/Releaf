const mongo = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(5000)



app.use(
	express.static(__dirname + '/public', {
		extensions: ['html']
	})
);

// Connect to mongodb
var url = 'mongodb://localhost:27017/mongochat';
mongo.connect(url, function(err, db) {
	if (err) {
		throw err;
	}
	console.log('Connected to MongoDB at 27017');
	console.log('Can now go to localhost:5000');
	// Connect to Socket.io
	io.on('connection', function(socket) {
    const myDb = db.db('mongochat');
    // myDb.collection('chats').insertOne({});

		let chat = myDb.collection('chats');

		// Create function to send status
		sendStatus = function(s) {
			socket.emit('status', s);
		};

		// Get chats from mongo collection
		chat
			.find()
			.limit(100)
			.sort({ _id: 1 })
			.toArray(function(err, res) {
				if (err) {
					throw err;
				}

				// Emit the messages
				socket.emit('output', res);
			});

		// Handle input events
		socket.on('input', function(data) {
			let name = data.name;
			let message = data.message;

			if (name == '' || message == '') {
				sendStatus('Please enter a Name and Message');
			} else {
				// Insert message into MongoDB
				chat.insert({ name: name, message: message }, function() {
					io.emit('output', [data]);

					// Sent status object
					sendStatus({
						message: 'Message Sent',
						clear: true
					});
				});
			}
		});

		// Handle clearing of chats
		socket.on('clear', function(data) {
			// Remove all chats from collection
			chat.remove({}, function() {
				// Emit cleared
				socket.emit('cleared');
			});
		});
	});
});
