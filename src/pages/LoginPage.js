import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/main'; // Import the store
import '../App.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoggedIn, users } = useStore();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


        const existingUser = users.find(user => user.username === username);

        if (!existingUser) {

            setError('User does not exist. Please register.');
        } else if (existingUser.password !== password) {

            setError('Incorrect password. Please try again.');
        } else {

            login(username, password);


            navigate('/profile');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <div className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>Login</button>
            </div>
            {error && <div className="error-message">{error}</div>}

        </div>
    );
}

export default LoginPage;
