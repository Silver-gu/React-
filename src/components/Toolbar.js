import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/main';
import '../App.css';

const Toolbar = () => {
    const { currentUser, logout } = useStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={styles.toolbar}>
            <div style={styles.toolbarContent}>
                <h2 style={styles.logo}>Whimsy & Wisdom</h2>
                <div style={styles.navLinks} className="d-flex a-center">
                    {currentUser ? (
                        <>
                            <Link to="/create-post" style={styles.link}>Create Post</Link>
                            <Link to="/users" style={styles.link}>Users</Link>
                            <Link to="/profile" style={styles.link}>Profile</Link>
                            <Link to="/posts" style={styles.link}>Posts</Link>
                            <Link to="/conversation" style={styles.link}>Messages</Link>
                            <h4>Nickname : {currentUser.username}</h4>
                            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.link}>Login</Link>
                            <Link to="/register" style={styles.link}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    toolbar: {
        backgroundColor: '#146060',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
    },
    toolbarContent: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1200px',
    },
    logo: {
        margin: 0,
    },
    navLinks: {
        display: 'flex',
        gap: '20px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        borderRadius: '5px',
    },
};

export default Toolbar;
