import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import Toolbar from './components/Toolbar';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import Profile from './pages/ProfilePage';
import PostsPage from './pages/PostsPage';
import CreatePostPage from './pages/CreatePostPage';
import ConversationPage from './pages/ConversationPage';

const App = () => {
    return (
        <Router>
            <Toolbar />
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/conversation" element={<ConversationPage />} />
            </Routes>
        </Router>
    );
};

export default App;
