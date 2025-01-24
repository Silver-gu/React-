import React, { useEffect, useState } from 'react';
import useStore from '../store/main';
import { useNavigate } from 'react-router-dom';

const ConversationPage = () => {
    const { currentUser, conversations, users } = useStore();
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userId = window.location.pathname.split('/').pop();
        const user = users.find((user) => user.id.toString() === userId);
        setSelectedUser(user);
    }, [users]);

    const handleSendMessage = () => {
        if (message.trim()) {

            useStore.getState().sendMessage(currentUser.id, selectedUser.id, message);
            setMessage('');
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd' }}>
                <h3>Users</h3>
                <div>
                    {Object.keys(conversations).map((userId) => {
                        const user = users.find((u) => u.id.toString() === userId);
                        return (
                            <div
                                key={userId}
                                onClick={() => setSelectedUser(user)}
                                style={{ padding: '10px', cursor: 'pointer', marginBottom: '10px', backgroundColor: selectedUser?.id === user.id ? '#eee' : '' }}
                            >
                                <h4>{user.username}</h4>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ flex: 1, padding: '20px' }}>
                {selectedUser ? (
                    <>
                        <h3>Conversation with {selectedUser.username}</h3>
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {(conversations[selectedUser.id] || []).map((msg, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '10px',
                                        marginBottom: '10px',
                                        backgroundColor: msg.senderId === currentUser.id ? '#d0f0c0' : '#f0f0f0',
                                        textAlign: msg.senderId === currentUser.id ? 'right' : 'left',
                                    }}
                                >
                                    <strong>{msg.senderId === currentUser.id ? 'You' : selectedUser.username}:</strong>
                                    <p>{msg.text}</p>
                                </div>
                            ))}
                        </div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            style={{ width: '100%', height: '100px', padding: '10px' }}
                        />
                        <button onClick={handleSendMessage} style={{ marginTop: '10px' }}>Send</button>
                    </>
                ) : (
                    <p>Select a user to start a conversation</p>
                )}
            </div>
        </div>
    );
};

export default ConversationPage;
