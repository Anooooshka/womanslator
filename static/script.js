const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const chatBox = document.getElementById('chatBox');

// Send message on button click
sendBtn.addEventListener('click', sendMessage);

// Send message on Enter key press
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Clear chat history
clearBtn.addEventListener('click', clearChat);

async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) {
        alert('Please enter a message! 📝');
        return;
    }

    // Add user message to chat
    addMessageToChat('user', message);
    messageInput.value = '';
    messageInput.focus();

    // Disable send button
    sendBtn.disabled = true;

    // Show loading indicator
    const loadingId = addLoadingIndicator();

    try {
        const response = await fetch('/api/interpret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Remove loading indicator
        removeLoadingIndicator(loadingId);

        // Add bot reply to chat
        addMessageToChat('bot', data.reply);

    } catch (error) {
        console.error('Error:', error);
        removeLoadingIndicator(loadingId);
        addMessageToChat('bot', '😅 Oops! Something went wrong. Try again!');
    } finally {
        sendBtn.disabled = false;
    }
}

function addMessageToChat(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Render markdown for bot messages, plain text for user messages
    if (sender === 'bot') {
        contentDiv.innerHTML = marked.parse(message);
    } else {
        contentDiv.textContent = message;
    }

    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addLoadingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.id = 'loading-' + Date.now();

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content loading';
    contentDiv.innerHTML = '<span class="dot">🤔</span><span class="dot">💭</span><span class="dot">⏳</span>';

    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    return messageDiv.id;
}

function removeLoadingIndicator(loadingId) {
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
        loadingElement.remove();
    }
}

async function clearChat() {
    if (confirm('Are you sure you want to clear the chat history? 🗑️')) {
        try {
            await fetch('/api/clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Clear chat display
            chatBox.innerHTML = `
                <div class="welcome-message">
                    <h2>Welcome! �</h2>
                    <p>Paste what your man said and I'll translate it to what you want to hear! 💅</p>
                </div>
            `;

            messageInput.focus();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to clear chat! ❌');
        }
    }
}

// Focus on input when page loads
messageInput.focus();
