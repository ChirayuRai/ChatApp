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

const messages = [] // acts like database

io.on('connection', (socket) => {
    console.log("A client has connected!");
    // Want some kind of traditional API endpoint thing where the 
    // client just looks for all the sent messages upon first connection.
    // As long as this server session is running, all these messages will be stored
    // Else, it'll be deleted. Kinda spooky innit bruv
    socket.on('get_messages', () => {
        io.emit('sent_messages', messages)
    })
    socket.on('chat_message', (message) => {
        console.log("Got chat message:", message);

        // NOTE: Sends out message to everyone but original sender
        //socket.broadcast.emit(message)

        messages.push(message)
        io.emit('chat_message', message)
    })
    socket.on('disconnect', () => {
        console.log('A client has disconnected :(');
    })
})



server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
