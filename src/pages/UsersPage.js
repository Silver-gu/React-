import React, { useState } from 'react';
import useStore from '../store/main';
import '../App.css';

function UsersPage() {
    const { users, currentUser, sendMessage } = useStore();
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);


    const filteredUsers = users.filter(user => user.username !== currentUser?.username);

    const handleSendMessage = () => {
        if (selectedUser && message.trim()) {
            sendMessage(selectedUser, message);
            setMessage('');
            setIsModalOpen(false);
        }
    };

    return (
        <div className="users-container">
            <h1 className="users-title">Registered Users</h1>
            {filteredUsers.length === 0 ? (
                <p>No other users registered yet.</p>
            ) : (
                <div className="users-list">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.username}
                            className="user-card"
                            onClick={() => {
                                setSelectedUser(user);
                                setIsModalOpen(true);
                            }}
                        >
                            <img
                                src={user.profileImage}
                                alt={user.username}
                                className="user-profile-image"
                            />
                            <div className="user-info">
                                <p><strong>Username:</strong> {user.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {isModalOpen && selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Send Message to {selectedUser.username}</h2>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your message..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UsersPage;
