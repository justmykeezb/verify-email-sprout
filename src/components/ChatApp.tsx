import React, { useEffect } from 'react';
import { messages, users, createChatItem, renderChatList, updateChatView, initializeEventListeners } from '../../app';

export const ChatApp: React.FC = () => {
  useEffect(() => {
    renderChatList();
    initializeEventListeners();
  }, []);

  return (
    <div className="app">
      <div className="chat-list" id="chatList">
        <div className="chat-list-header">
          <h2>Messages</h2>
        </div>
        <div className="chat-list-content" id="chatListContent">
          {/* Chat list items will be inserted here by JavaScript */}
        </div>
      </div>
      <div className="chat-view" id="chatView">
        <div className="chat-view-placeholder" id="chatViewPlaceholder">
          <p>Select a conversation to start messaging</p>
        </div>
        <div className="chat-view-content hidden" id="chatViewContent">
          <div className="chat-view-header">
            <button className="back-button" id="backButton">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div className="chat-user-info">
              <div className="avatar" id="chatViewAvatar">
                {/* Avatar content will be inserted here */}
              </div>
              <div className="user-details">
                <h2 id="chatViewUsername"></h2>
                <p id="chatViewStatus"></p>
              </div>
            </div>
          </div>
          <div className="chat-messages" id="chatMessages">
            {/* Messages will be inserted here */}
          </div>
          <div className="message-input-container">
            <textarea 
              className="message-input" 
              placeholder="Type a message..." 
              rows={1}
              id="messageInput"
            />
            <button className="send-button" id="sendButton">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;