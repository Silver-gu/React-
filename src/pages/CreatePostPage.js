import React, { useState } from 'react';
import useStore from '../store/main'; // Access the store
import { useNavigate } from 'react-router-dom';

function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [postContent, setPostContent] = useState('');
    const { currentUser, addPost } = useStore();
    const navigate = useNavigate();

    const handlePostSubmit = () => {
        if (currentUser) {
            if (!title || !description || !imageUrl ) {
                alert('Please fill in all fields!');
                return;
            }

            const newPost = {
                title,
                description,
                imageUrl,
                content: postContent,
                author: currentUser.username,
                timestamp: new Date().toISOString(),
                comments: [],
                likes: [],
            };
            addPost(newPost);
            navigate('/posts');
        } else {
            alert('You must be logged in to create a post!');
            navigate('/login');
        }
    };

    return (
        <div className="create-post-page">
            <h2>Create a Post</h2>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter post description"
                    rows="3"
                    cols="50"
                />
            </div>
            <div>
                <label>Image URL:</label>
                <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter post image URL"
                />
            </div>

            <div>
                <button onClick={handlePostSubmit}>Submit Post</button>
            </div>
        </div>
    );
}

export default CreatePostPage;
