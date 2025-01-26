const messages = [
  {
    id: "1",
    userId: "1",
    username: "Mykee",
    avatar: "",
    lastMessage: "The nature here is fantastic!!",
    timestamp: "11:28 PM",
    isOnline: true,
  },
  {
    id: "2",
    userId: "2",
    username: "Alex Winter",
    avatar: "",
    lastMessage: "Hey, how's it going?",
    timestamp: "10:15 PM",
    isOnline: false,
  },
  {
    id: "3",
    userId: "3",
    username: "Sam Spring",
    avatar: "",
    lastMessage: "See you tomorrow!",
    timestamp: "9:45 PM",
    isOnline: true,
  },
];

const users = {
  "1": {
    username: "Mykee",
    avatar: "",
    status: "Active now",
  },
  "2": {
    username: "Alex Winter",
    avatar: "",
    status: "Offline",
  },
  "3": {
    username: "Sam Spring",
    avatar: "",
    status: "Active now",
  },
};

const gradients = [
  "linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%)",
  "linear-gradient(135deg, #D946EF 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #6E59A5 0%, #E5DEFF 100%)",
];

function isMobileDevice() {
  // Check for mobile device regardless of viewport width
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['mobile', 'android', 'iphone', 'ipod', 'ipad', 'windows phone'];
  return mobileKeywords.some(keyword => userAgent.includes(keyword));
}

function isDesktopMode() {
  return window.innerWidth >= 768 && !isMobileDevice();
}

function handleResponsiveLayout() {
  const chatView = document.getElementById('chatView');
  const stickyTextarea = document.querySelector('.sticky-textarea');
  const chatList = document.getElementById('chatList');
  const isMobile = isMobileDevice();
  
  if (isMobile) {
    // Always use mobile layout for mobile devices
    if (chatView) {
      chatView.style.position = 'fixed';
      chatView.style.top = '0';
      chatView.style.left = '0';
      chatView.style.width = '100%';
      chatView.style.height = '100%';
      if (!chatView.classList.contains('active')) {
        chatView.style.transform = 'translateX(100%)';
      }
    }
    if (stickyTextarea) {
      stickyTextarea.style.left = '0';
      stickyTextarea.style.width = '100%';
      stickyTextarea.style.zIndex = '51';
    }
    if (chatList) {
      chatList.style.width = '100%';
    }
  } else {
    // Desktop layout for non-mobile devices
    if (chatView) {
      chatView.style.position = 'relative';
      chatView.style.top = 'auto';
      chatView.style.left = 'auto';
      chatView.style.width = 'auto';
      chatView.style.height = 'auto';
      chatView.style.transform = 'none';
    }
    if (stickyTextarea) {
      stickyTextarea.style.left = '380px';
      stickyTextarea.style.width = 'auto';
      stickyTextarea.style.zIndex = '2';
    }
    if (chatList) {
      chatList.style.width = '380px';
    }
  }
}

function getGradientBackground(index) {
  return gradients[index % gradients.length];
}

function createAvatar(user, index) {
  if (user.avatar) {
    return `<img src="${user.avatar}" alt="${user.username}" />`;
  }
  return `<span style="background: ${getGradientBackground(index)}">${user.username[0]}</span>`;
}

function createChatItem(message, index) {
  return `
    <div class="chat-item" data-user-id="${message.userId}">
      <div class="avatar">
        ${createAvatar(message, index)}
        ${message.isOnline ? '<span class="online-indicator"></span>' : ''}
      </div>
      <div class="chat-item-content">
        <div class="chat-item-header">
          <span class="username">${message.username}</span>
          <span class="timestamp">${message.timestamp}</span>
        </div>
        <p class="last-message">${message.lastMessage}</p>
      </div>
    </div>
  `;
}

function renderChatList() {
  const chatListContent = document.getElementById('chatListContent');
  chatListContent.innerHTML = messages.map((message, index) => createChatItem(message, index)).join('');
}

function updateChatView(userId) {
  const chatView = document.getElementById('chatView');
  const chatViewContent = document.getElementById('chatViewContent');
  const chatViewPlaceholder = document.getElementById('chatViewPlaceholder');
  const chatViewUsername = document.getElementById('chatViewUsername');
  const chatViewStatus = document.getElementById('chatViewStatus');
  const chatViewAvatar = document.getElementById('chatViewAvatar');

  if (!userId) {
    chatViewContent.classList.add('hidden');
    chatViewPlaceholder.classList.remove('hidden');
    return;
  }

  const user = users[userId];
  const index = parseInt(userId) - 1;

  chatViewContent.classList.remove('hidden');
  chatViewPlaceholder.classList.add('hidden');
  chatViewUsername.textContent = user.username;
  chatViewStatus.textContent = user.status;
  chatViewAvatar.innerHTML = createAvatar(user, index);

  // Update active state in chat list
  const chatItems = document.querySelectorAll('.chat-item');
  chatItems.forEach(item => {
    item.classList.toggle('active', item.dataset.userId === userId);
  });

  // Show chat view on mobile
  if (isMobileDevice()) {
    chatView.classList.add('active');
  }
}

function initializeEventListeners() {
  // Chat item click handler
  document.getElementById('chatListContent').addEventListener('click', (e) => {
    const chatItem = e.target.closest('.chat-item');
    if (chatItem) {
      const userId = chatItem.dataset.userId;
      updateChatView(userId);
    }
  });

  // Back button handler
  document.getElementById('backButton').addEventListener('click', () => {
    const chatView = document.getElementById('chatView');
    chatView.classList.remove('active');
  });

  // Auto-resize textarea
  const messageInput = document.getElementById('messageInput');
  messageInput?.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 160) + 'px';
  });

  // Send button handler
  document.getElementById('sendButton')?.addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message) {
      console.log('Sending message:', message);
      messageInput.value = '';
      messageInput.style.height = 'auto';
    }
  });

  // Add resize event listener for responsive layout
  window.addEventListener('resize', handleResponsiveLayout);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  renderChatList();
  initializeEventListeners();
  handleResponsiveLayout(); // Initial layout check
});