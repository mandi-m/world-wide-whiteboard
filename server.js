const path = require('path');
// const http = require('http');
const express = require('express');
const app = express(); // the app returned by express() is a JavaScript Function. Not something we can pass to our sockets!
const socketio = require('socket.io');


// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

//this creates a new connection server for web sockets and integrates into http server
const io = socketio(server);

io.on('connection', function (socket) {
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    console.log(socket.id);

    socket.on('draw', function(start, end, strokeColor){
        socket.broadcast.emit('everyone', start, end, strokeColor);
    })

    socket.on('disconnect', function(){
        console.log('disconnected socket', socket.id);
    })

});

// socket.on('disconnect', function (socket) {
//     /* This function receives the newly connected socket.
//        This function will be called for EACH browser that connects to our server. */
//     console.log('A client has left. :( ');
//     console.log(socket.id);
// });

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
