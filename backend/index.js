var express = require('express');
var { createServer } = require('node:http');
var { Server } = require('socket.io');
const cors = require('cors')

var app = express();
const server = createServer(app);
app.use(cors());
const io = new Server(server, {
    cors: ['http://localhost:5173']
})


io.on('connection', (socket) => {
    console.log("A client has connected!");
    socket.on('chat message', (message) => {
        console.log("Got chat message:", message);

        // NOTE: Sends out message to everyone but original sender
        //socket.broadcast.emit(message)

        io.emit('chat message', message)
    })
    socket.on('disconnect', () => {
        console.log('A client has disconnected :(');
    })
})



server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
