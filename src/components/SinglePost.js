import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

const SinglePost = ({ post, username, secret, remove }) => {
    const nav = useNavigate();
    const location = useLocation();

    const [isEditing, setIsEditing] = useState(false);
    const [updatedPost, setUpdatedPost] = useState({
        title: post.title,
        description: post.description,
        image: post.image
    });

    function deletePost() {
        const item = {
            secretKey: secret,
            id: post.id
        };

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        };

        fetch("http://167.99.138.67:1111/deletepost", options)
            .then(res => res.json())
            .then(response => {
                console.log(response);
                if (response.success) {
                    if (location.pathname === "/") {
                        remove(item.id);
                    } else {
                        nav("/");
                    }
                }
            });
    }

    function updatePost() {
        const item = {
            secretKey: secret,
            title: updatedPost.title,
            description: updatedPost.description,
            image: updatedPost.image,
            id: post.id
        };

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        };

        fetch("http://167.99.138.67:1111/updatepost", options)
            .then(res => res.json())
            .then(response => {
                console.log(response);
                if (response.success) {
                    setIsEditing(false);
                }
            });
    }

    return (
        <div className="border p20 post">
            <img src={post.image} alt="" />

            <Link to={`/singlePost/${post.username}/${post.id}`}>
                <h4>{post.title}</h4>
            </Link>

            <Link to={`/userPosts/${post.username}`}>
                <b>{post.username}</b>
            </Link>

            {post.username === username && (
                <div className="mt3">
                    <button onClick={deletePost}>Delete</button>
                    <button onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancel" : "Update"}
                    </button>
                </div>
            )}

            {isEditing && (
                <div className="edit-form mt3">
                    <input
                        type="text"
                        value={updatedPost.title}
                        onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={updatedPost.image}
                        onChange={(e) => setUpdatedPost({ ...updatedPost, image: e.target.value })}
                        placeholder="Image URL"
                    />
                    <input
                        type="text"
                        value={updatedPost.description}
                        onChange={(e) => setUpdatedPost({ ...updatedPost, description: e.target.value })}
                        placeholder="Description"
                    />
                    <button onClick={updatePost}>Save</button>
                </div>
            )}
        </div>
    );
};

export default SinglePost;
