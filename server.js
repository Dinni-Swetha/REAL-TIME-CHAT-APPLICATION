// server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

server.on('connection', socket => {
  socket.on('message', message => {
    // Broadcast to all clients
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.send(JSON.stringify({ user: 'System', text: 'Welcome to WhatsApp Clone!' }));
});

console.log('WebSocket server running at ws://localhost:3000');
