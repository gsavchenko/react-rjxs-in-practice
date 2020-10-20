const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

io.on("connection", (socket) => {
  this.socket = socket;
  console.log("New Client Connected");
  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  this.socket.emit('data', 'CHUNK1');
  this.socket.emit('data', 'CHUNK2')
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
server.listen(4001, () => {
  console.log('server listening on 3001');
})