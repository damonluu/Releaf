var client = function() {
	var element = function(id) {
		return document.getElementById(id);
	};
	// Get Elements
	var messages = element('messages');
	var textarea = element('textarea');
	var username = element('username');

	// Connect to socket.io
	var socket = io.connect('http://localhost:5000');

	// Check for connection
	var testmongoid = '2222';
  var pairedmongoid = '1337';

	if (socket !== undefined) {
		console.log('Connected to socket...');

		socket.on('connect', function() {
			console.log('connect socket in client js');
			console.log('testmongoid: ' + testmongoid);
      // socket.mongoid = testmongoid;
			socket.emit('login', { mongoid: testmongoid,
      pairedmongoid: pairedmongoid});
		});

		socket.on('start chat', function(data) {
      console.log('inside start chat');
      console.log('data: ' + JSON.stringify(data));
      console.log('testmongoid: '+ testmongoid);
      console.log('data.mongoid: ' + data.mongoid);
      console.log('data.pairedmongoid: ' + data.pairedmongoid);
			// if (data.name != loggedin) {
			// 	alert('test');
			// }
      if(data.mongoid == testmongoid || data.pairedmongoid == testmongoid) {
        console.log('you are now connected');
        var message = document.createElement('div');
        message.setAttribute('class', 'chat-message');
        message.textContent = 'You are now connected';
        messages.appendChild(message);
        messages.insertBefore(message, messages.firstChild);
      }


		});

		socket.on('output', function(data) {
      console.log('socket output data');
      console.log('data: ' + JSON.stringify(data));
      console.log('data.testmongoid: ' + data.testmongoid);
      console.log('data.pairedmongoid: ' + data.pairedmongoid);
      if(!data[0] && (data.testmongoid == testmongoid || data.pairedmongoid == testmongoid)) {
        // if (data.length) {
        console.log('client js inside socket output after if statement');
					// for (var x = 0; x < data.length; x++) {
						// build message div
						var message = document.createElement('div');
						message.setAttribute('class', 'chat-message');
						message.textContent = data.name + ': ' + data.message;
						messages.appendChild(message);
						messages.insertBefore(message, messages.firstChild);
					// }
				// }
      }
		});

		// Handle input
		textarea.addEventListener('keydown', function(event) {
			// If enter/return key is pressed
			if (event.which === 13 && !event.shiftKey) {
				// Emit to server input
        socket.emit('input', {
					name: username.value,
					message: textarea.value,
          testmongoid: testmongoid,
          pairedmongoid: pairedmongoid
				});
				textarea.value = '';
				event.preventDefault();
			}
		});
	}
};

client();
