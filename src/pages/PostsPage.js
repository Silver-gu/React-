// src/pages/PostsPage.js
import React, { useState } from 'react';
import useStore from '../store/main'; // Access the store
import { Link } from 'react-router-dom';

function PostsPage() {
    const { posts, currentUser, likePost, deletePost, addComment, deleteComment } = useStore(); // Get posts and likePost function from store
    const [commentContent, setCommentContent] = useState('');

    const handleLike = (post) => {
        if (currentUser) {
            likePost(post); // Toggle like status
        }
    };

    const handleDelete = (post) => {
        if (currentUser && currentUser.username === post.author) {
            const confirmDelete = window.confirm("Are you sure you want to delete this post?");
            if (confirmDelete) {
                deletePost(post); // Call the deletePost function from the store to remove the post
            }
        }
    };

    const handleCommentSubmit = (postId) => {
        if (commentContent) {
            const newComment = {
                id: Date.now(), // Unique ID based on timestamp
                author: currentUser.username,
                content: commentContent,
                timestamp: new Date().toISOString()
            };
            addComment(postId, newComment);
            setCommentContent(''); // Clear the comment input field
        }
    };

    const handleDeleteComment = (postId, commentId) => {
        if (currentUser) {
            deleteComment(postId, commentId);
        }
    };

    return (
        <div className="posts-page">
            <h2>All Posts</h2>
            {posts.length === 0 ? (
                <p className="no-posts">No posts available. Create a post!</p>
            ) : (
                <div className="posts-list">
                    {posts.map((post, index) => (
                        <div key={index} className="post">
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                            {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 'auto' }} />}
                            <p>{post.content}</p>
                            <small>Posted by: <strong>{post.author}</strong> on {new Date(post.timestamp).toLocaleString()}</small>

                            {/* Display like/unlike button and count */}
                            <div className="like-section">
                                <button onClick={() => handleLike(post)}>
                                    {post.likes && post.likes.includes(currentUser?.username)
                                        ? 'Unlike'
                                        : 'Like'}
                                </button>
                                <p>{post.likes ? post.likes.length : 0} {post.likes && post.likes.length === 1 ? 'Like' : 'Likes'}</p>
                            </div>

                            {/* Comment Section */}
                            <div className="comments-section">
                                <h4>Comments</h4>
                                <div className="comments-list">
                                    {post.comments && post.comments.length > 0 ? (
                                        post.comments.map((comment) => (
                                            <div key={comment.id} className="comment">
                                                <p><strong>{comment.author}</strong>: {comment.content}</p>
                                                <small>{new Date(comment.timestamp).toLocaleString()}</small>
                                                {currentUser && currentUser.username === comment.author && (
                                                    <button onClick={() => handleDeleteComment(post.timestamp, comment.id)}>Delete </button>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet. Be the first to comment!</p>
                                    )}
                                </div>

                                {currentUser ? (
                                    <div className="comment-input">
                                        <textarea
                                            value={commentContent}
                                            onChange={(e) => setCommentContent(e.target.value)}
                                            placeholder="Add a comment"
                                            rows="3"
                                            cols="50"
                                        />
                                        <button onClick={() => handleCommentSubmit(post.timestamp)}>Submit </button>
                                    </div>
                                ) : (
                                    <p>You must be logged in to comment.</p>
                                )}
                            </div>

                            {currentUser && currentUser.username === post.author && (
                                <button onClick={() => handleDelete(post)}>Delete Post</button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PostsPage;
