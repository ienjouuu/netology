const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  const {id} = socket;
  console.log(`Socket connected: ${id}`);

  // сообщение себе
  socket.on('message-to-me', (msg) => {
    msg.type = 'me';
    socket.emit('message-to-me', msg);
  });

  // сообщение для всех
  socket.on('message-to-all', (msg) => {
    msg.type = 'all';
    socket.broadcast.emit('message-to-all', msg);
    socket.emit('message-to-all', msg);
  });

  // работа с комнатами
  const {roomName} = socket.handshake.query;
  console.log(`Socket roomName: ${roomName}`);
  socket.join(roomName);
  socket.on('message-to-room', (msg) => {
    msg.type = `room: ${roomName}`;
    socket.to(roomName).emit('message-to-room', msg);
    socket.emit('message-to-room', msg);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
});

// routes
const indexRouter = require('./routes/index');
const books = require('./routes/books');
const user = require('./routes/user');
const api = require('./routes/api');


app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/books', books);
app.use('/api/user', user);
app.use('/api', api);


const PORT = process.env.PORT || 3000;
server.listen(PORT);
