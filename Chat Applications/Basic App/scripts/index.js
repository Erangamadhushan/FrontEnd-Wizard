// Initialize the chap app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
})
class ChatApp {
    constructor() {
        this.messages = [];
        this.users = new Set();
        this.currentUser = '';
        this.typingUsers = new Set();
        this.typingTimeout = null;

        this.initializeElements();
        this.attachEventListeners();
        this.simulateRealTimeFeatures();
    }

    initializeElements() {
        this.messagesContainer = document.getElementById('messagesContainer');
        this.messageInput = document.getElementById('messageInput');
        this.usernameInput = document.getElementById('usernameInput');
        this.sendButton = document.getElementById('sendButton');
        this.onlineCount = document.getElementById('onlineCount');
        this.typingIndicator = document.getElementById('typingIndicator');
    }

    attachEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            } else {
                this.handleTyping();
            }
        });

        this.usernameInput.addEventListener('input', (e) => {
            this.currentUser = e.target.value.trim();
        });

        // Auto-focus message input when username is set
        this.usernameInput.addEventListener('blur', () => {
            if (this.currentUser) {
                this.messageInput.focus();
            }
        });
    }

    handleTyping() {
        if (!this.currentUser) return;

        // Clear existing timeout
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }

        // Show typing indicator
        this.showTypingIndicator(`${this.currentUser} is typing...`);

        // Hide typing indicator after 2 seconds of inactivity
        this.typingTimeout = setTimeout(() => {
            this.hideTypingIndicator();
        }, 2000);
    }

    showTypingIndicator(text) {
        this.typingIndicator.textContent = text;
        this.typingIndicator.style.display = 'block';
    }

    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }

    sendMessage() {
        const messageText = this.messageInput.value.trim();
        const username = this.currentUser || 'Anonymous';

        if (!messageText) return;

        const message = {
            id: Date.now(),
            username: username,
            text: messageText,
            timestamp: new Date(),
            isOwn: true
        };

        this.addMessage(message);
        this.messageInput.value = '';
        this.hideTypingIndicator();

        // Add user to online users
        this.users.add(username);
        this.updateOnlineCount();

        // Simulate receiving messages from other users
        setTimeout(() => this.simulateIncomingMessage(), 1000 + Math.random() * 3000);
    }

    addMessage(message) {
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }

    renderMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.isOwn ? 'own' : ''}`;
        
        const timeString = message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-header">${message.username}</div>
                <div class="message-text">${this.escapeHtml(message.text)}</div>
                <div class="message-time">${timeString}</div>
            </div>
        `;

        this.messagesContainer.appendChild(messageDiv);
    }

    simulateIncomingMessage() {
        const responses = [
            "Hey there! How's everyone doing?",
            "Great to see the chat is active! 🎉",
            "Anyone working on interesting projects today?",
            "This chat app looks really nice!",
            "Hello from the other side! 👋",
            "Love the real-time features here",
            "The UI design is really clean",
            "Anyone else excited about new tech?",
            "Hope everyone is having a great day!",
            "The animations are smooth! 🚀"
        ];

        const usernames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eva', 'Frank', 'Grace'];
        const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        const message = {
            id: Date.now(),
            username: randomUsername,
            text: randomResponse,
            timestamp: new Date(),
            isOwn: false
        };

        // Show typing indicator first
        this.showTypingIndicator(`${randomUsername} is typing...`);
        
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(message);
            this.users.add(randomUsername);
            this.updateOnlineCount();
        }, 1500);
    }

    updateOnlineCount() {
        const count = this.users.size;
        this.onlineCount.textContent = `${count} user${count !== 1 ? 's' : ''} online`;
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    simulateRealTimeFeatures() {
        // Add some initial users
        ['Alex', 'Sam', 'Jordan'].forEach(user => this.users.add(user));
        this.updateOnlineCount();

        // Periodically simulate user activity
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every 10 seconds
                this.simulateIncomingMessage();
            }
        }, 10000);
    }

    
}