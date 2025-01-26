import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/main'; // Import the store

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { addUser, users } = useStore();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = [];


        if (users.some(user => user.username === username)) {
            newErrors.push('Username is already taken.');
        }


        if (password !== confirmPassword) {
            newErrors.push('Passwords do not match.');
        }
        if (password.length < 6 || password.length > 20) {
            newErrors.push('Password must be between 6 and 20 characters.');
        }


        if (username.length < 3 || username.length > 15) {
            newErrors.push('Username must be between 3 and 15 characters.');
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleRegister = (e) => {
        e.preventDefault();


        if (!validateForm()) return;


        const newUser = {
            username,
            password,
            name: username,
            profileImage: 'https://cdn-icons-png.flaticon.com/512/12225/12225935.png',
        };


        addUser(newUser);

        navigate('/login');
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <div className="register-form">
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleRegister}>Register</button>
            </div>


            {errors.length > 0 && (
                <div className="error-messages">
                    {errors.map((error, index) => (
                        <p key={index} className="error-message">{error}</p>
                    ))}
                </div>
            )}


        </div>
    );
}

export default RegisterPage;
