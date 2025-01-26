import React, { useState, useEffect } from 'react';
import useStore from '../store/main';
import '../App.css';

function ConversationPage() {
    const { users, currentUser, sendMessage, messages } = useStore();
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const conversations = users.filter(user =>
        messages.some(msg => (msg.sender === currentUser.username && msg.recipient === user.username) ||
            (msg.sender === user.username && msg.recipient === currentUser.username))
    );

    const messagesForSelectedUser = selectedUser ? messages.filter(msg =>
        (msg.sender === currentUser.username && msg.recipient === selectedUser.username) ||
        (msg.sender === selectedUser.username && msg.recipient === currentUser.username)
    ) : [];

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendMessage(selectedUser, newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="conversation-container">
            <div className="user-list">
                <h2>Conversations</h2>
                {conversations.length === 0 ? (
                    <p>No conversations yet.</p>
                ) : (
                    conversations.map((user) => (
                        <div
                            key={user.username}
                            className="user-item"
                            onClick={() => setSelectedUser(user)}
                        >
                            <p>{user.username}</p>
                        </div>
                    ))
                )}
            </div>

            <div className="message-box">
                {selectedUser ? (
                    <>
                        <h2>Chat with {selectedUser.username}</h2>
                        <div className="messages">
                            {Array.isArray(messagesForSelectedUser) && messagesForSelectedUser.length > 0 ? (
                                messagesForSelectedUser.map((msg, index) => (
                                    <div key={index} className={msg.sender === currentUser.username ? 'message-sent' : 'message-received'}>
                                        <p><strong>{msg.sender}:</strong> {msg.message}</p>
                                        <p className="timestamp">{new Date(msg.timestamp).toLocaleString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No messages to show.</p>
                            )}
                        </div>
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Write your message..."
                        />
                        <button className="buttonSend" onClick={handleSendMessage}>Send</button>
                    </>
                ) : (
                    <p>Select a user to start chatting.</p>
                )}
            </div>
        </div>
    );
}

export default ConversationPage;
