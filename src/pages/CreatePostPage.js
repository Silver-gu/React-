import React, { useState } from 'react';
import useStore from '../store/main';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const { addPost, currentUser } = useStore();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert('You must be logged in to create a post.');
            return;
        }
        const newPost = {
            id: Date.now(),
            title,
            content,
            imageUrl,
            comments: [],
            userId: currentUser.id,
            likedBy: [],
        };
        addPost(newPost);
        setTitle('');
        setImageUrl('');
        setContent('');
        navigate('/posts');
    };

    return (
        <div className="d-flex direction-col a-center">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="d-flex direction-col">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex direction-col">
                    <label>Image URL</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex direction-col">
                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button className="registerButton" type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePostPage;
