import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Toolbar from './components/Toolbar';
import CreatePostPage from './pages/CreatePostPage';
import PostsPage from './pages/PostsPage';
import Conversation from './pages/ConversationPage';


function App() {
    return (
        <Router>
            <Toolbar />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/conversation" element={<Conversation />} />
            </Routes>
        </Router>
    );
}

export default App;
