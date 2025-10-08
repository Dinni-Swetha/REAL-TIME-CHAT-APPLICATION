const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message');

// Random user name
const username = "You";

// Add message to chat box
function addMessage(text, sender = 'you') {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = `${sender === 'you' ? 'You' : 'Bot'}: ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle form submit
chatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const msg = messageInput.value.trim();
  if (msg) {
    addMessage(msg, 'you');
    messageInput.value = '';

    // Simulated reply after 1.5 seconds
    setTimeout(() => {
      const reply = generateReply(msg);
      addMessage(reply, 'other');
    }, 1500);
  }
});

// Simple reply logic
function generateReply(userMsg) {
  userMsg = userMsg.toLowerCase();
  
  if (userMsg.includes("hello")) return "Hi! How can I help you?";
  if (userMsg.includes("how are you")) return "I'm good! What about you?";
  if (userMsg.includes("bye")) return "See you later!";
  
  return "Sorry, I didn't understand that.";
}

