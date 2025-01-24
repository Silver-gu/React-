import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/main';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const users = useStore((state) => state.users);
    const addUser = useStore((state) => state.addUser);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 8 || password.length > 16) {
            setError('Password must be between 8 and 16 characters.');
            return;
        }

        if (username.length < 3 || username.length > 16) {
            setError('Username must be between 3 and 16 characters.');
            return;
        }

        if (users.some((user) => user.username === username)) {
            setError('Username already taken.');
            return;
        }

        const newUser = {
            id: Date.now(),
            username,
            password,
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
        };

        addUser(newUser);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setError('');
        navigate('/login');
    };

    return (
        <div className="d-flex direction-col a-center">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="d-flex direction-col">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="d-flex direction-col">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-flex direction-col">
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className="registerButton" type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
