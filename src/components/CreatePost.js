import React, { useState } from 'react';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleCreatePost = async () => {
        const data = { title, description, imageUrl };

        try {
            const res = await fetch('http://localhost:2002/createPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is stored after login
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (result.success) {
                alert('Post created successfully');
            } else {
                alert('Error creating post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('An error occurred');
        }
    };

    return (
        <div>
            <h2>Create Movie Post</h2>
            <div className="d-flex direction-col gap10 ">
                <div><input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /></div>
                <div><input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                /></div>
                <div>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div>
                    <button className="reserveBnt" onClick={handleCreatePost}>Create</button>
                </div>


            </div>

        </div>
    );
};

export default CreatePost;
