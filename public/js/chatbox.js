var chatModule = (function() {
  console.log('Here')
  var element = function(id) {
    return document.getElementById(id);
  };
  // Get Elements
  var status = element('status');
  var messages = element('messages');
  var textarea = element('textarea');
  var username = element('username');
  var clearBtn = element('clear');

  // Set default status
  var statusDefault = status.textContent;

  var setStatus = function(s) {
    status.textContent = s;

    if (s !== statusDefault) {
      var deleay = setTimeout(function() {
        setStatus(statusDefault);
      }, 4000);
    }
  };

  // Connect to socketi.io
  var socket = io.connect('http://localhost:5000');

  // Check for connection
  if(socket !== undefined) {
    console.log('Connected to socket...');

    socket.on('output', function(data) {
      // console.log(data);
      if(data.length) {
        for(var x = 0; x < data.length; x++) {
          // build message div
          var message = document.createElement('div');
          message.setAttribute('class', 'chat-message');
          message.textContent = data[x].name + ": " + data[x].message;
          messages.appendChild(message);
          messages.insertBefore(message, messages.firstChild);
        }
      }
    });

    socket.on('status', function(data) {
      // Get message status
      setStatus((typeof data === 'object') ? data.message : data);

      // If status is clear, clear the textbox
      if(data.clear) {
        textarea.value = '';
      }
    });

    // Handle input
    textarea.addEventListener('keydown', function(event) {
      // If enter/return key is pressed
      if(event.which === 13 && !event.shiftKey) {
        // Emit to server input
        socket.emit('input', {
          name:username.value,
          message:textarea.value
        });

        event.preventDefault();
      }
    });

    clearBtn.addEventListener('click', function() {
      socket.emit('clear');
    })

    socket.on('cleared', function () {
      messages.textContent = '';
    })
  }

})();
chatModule();
