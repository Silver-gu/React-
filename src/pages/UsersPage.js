import React, { useState } from 'react';
import useStore from '../store/main';

const UsersPage = () => {
    const { users, currentUser, sendMessage, conversations } = useStore();
    const [message, setMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSelectUser = (user) => {
        if (user.id !== currentUser.id) {
            setSelectedUser(user);
        }
    };


    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage(selectedUser.id, message);
            setMessage('');
        }
    };


    const getMessagesForUser = (userId) => {

        const conversationKey = `${Math.min(currentUser.id, userId)}-${Math.max(currentUser.id, userId)}`;
        return conversations[conversationKey] || [];
    };

    return (
        <div>
            <h2>Registered Users</h2>
            <div className="users-container">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="user-card"
                        onClick={() => handleSelectUser(user)}
                    >
                        <img
                            className="profile-img"
                            src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"}
                            alt={`${user.username}'s profile`}
                        />
                        <div className="user-info">
                            <h3>{user.username}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {selectedUser && (
                <div className="message-section">
                    <h3>Send Message to {selectedUser.username}</h3>


                    <div className="messages-display">
                        {getMessagesForUser(selectedUser.id).map((msg, index) => (
                            <div key={index} className={msg.senderId === currentUser.id ? "sent-message" : "received-message"}>
                                <strong>{msg.senderId === currentUser.id ? 'You' : selectedUser.username}: </strong>
                                <p>{msg.text}</p>
                            </div>
                        ))}
                    </div>


                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        rows="4"
                        cols="50"
                    />
                    <div className="message-actions">
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
