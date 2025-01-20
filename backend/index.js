var express = require('express');
var { createServer } = require('node:http');
var { join } = require('node:path');
var { Server } = require('socket.io');

var app = express();
const server = createServer(app);
const io = new Server(server)


app.get('/', function (req, res) {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log("A client has connected!");
    socket.on('disconnect', () => {
        console.log('A client has disconnected :(');
    })
})

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
