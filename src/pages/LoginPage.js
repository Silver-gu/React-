import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/main';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const users = useStore((state) => state.users);
    const setCurrentUser = useStore((state) => state.setCurrentUser);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
            setCurrentUser(user);
            navigate('/profile');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="d-flex direction-col a-center" >
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="d-flex direction-col">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="d-flex direction-col">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className="registerButton" type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
