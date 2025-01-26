import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/main';
import '../App.css';

function Toolbar() {
    const { currentUser, logout } = useStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="toolbar">
            <h3>My App</h3>
            <div className="toolbar-links d-flex a-center">
                {currentUser ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <Link to="/users">Users</Link>
                        <Link to="/posts">Posts</Link>
                        <Link to="/create-post">Create Post</Link>
                        <Link to="/conversation">Messages</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Toolbar;
