const socket = io();

let username = '';
while (!username) {
  username = prompt("Enter your username:");
}

socket.emit('new user', username);

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', {
      username,
      text: input.value,
      timestamp: new Date().toLocaleTimeString()
    });
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.innerHTML = `<strong>${msg.username}</strong> [${msg.timestamp}]: ${msg.text}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

input.addEventListener('input', () => {
  socket.emit('typing', username);
});

socket.on('typing', (user) => {
  const typingDiv = document.getElementById('typing');
  typingDiv.innerText = `${user} is typing...`;
  clearTimeout(window.typingTimeout);
  window.typingTimeout = setTimeout(() => {
    typingDiv.innerText = '';
  }, 1000);
});

socket.on('user joined', (user) => {
  const item = document.createElement('li');
  item.innerHTML = `<em>${user} joined the chat</em>`;
  messages.appendChild(item);
});

socket.on('user left', (user) => {
  const item = document.createElement('li');
  item.innerHTML = `<em>${user} left the chat</em>`;
  messages.appendChild(item);
});
