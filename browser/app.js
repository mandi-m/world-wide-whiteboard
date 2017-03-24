'use strict';

var socket = io(window.location.origin);
socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

whiteboard.on('draw', function(start, end, strokeColor){
  socket.emit('draw', start, end, strokeColor);
  console.log('hey');
})

socket.on('everyone', function(start, end, strokeColor){
  window.whiteboard.draw(start, end, strokeColor);
})
