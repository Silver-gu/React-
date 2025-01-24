import React, { useState } from 'react';
import useStore from '../store/main';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const PostsPage = () => {
    const [newPostContent, setNewPostContent] = useState('');
    const [newComment, setNewComment] = useState('');
    const posts = useStore((state) => state.posts) || []; // Default to empty array if undefined
    const users = useStore((state) => state.users) || [];
    const currentUser = useStore((state) => state.currentUser);
    const addPost = useStore((state) => state.addPost);
    const addCommentToPost = useStore((state) => state.addCommentToPost);
    const likePost = useStore((state) => state.likePost);
    const removePost = useStore((state) => state.removePost);
    const removeComment = useStore((state) => state.removeComment);
    const navigate = useNavigate();

    const handleCreatePost = () => {
        if (!newPostContent) return;
        const newPost = {
            id: Date.now(),
            content: newPostContent,
            userId: currentUser.id,
            comments: [],
            likedBy: [],
        };
        addPost(newPost);
        setNewPostContent('');
    };

    const handleCommentSubmit = (postId) => {
        if (!newComment) return;
        const comment = {
            id: Date.now(),
            content: newComment,
            userId: currentUser.id,
        };
        addCommentToPost(postId, comment);
        setNewComment('');
    };

    const getPostCreatorUsername = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.username : 'Unknown User';
    };

    const getCommentCreatorUsername = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.username : 'Anonymous';
    };

    return (
        <div className="posts-container">
            <h2>Posts</h2>
            {posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <h3>{post.content}</h3>
                        {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                        <p><strong>Posted by:</strong> {getPostCreatorUsername(post.userId)}</p>

                        <button
                            className="like-button"
                            onClick={() => likePost(post.id)}
                        >
                            {post.likedBy && post.likedBy.includes(currentUser.id) ? 'Unlike' : 'Like'}
                        </button>
                        <span className="likes-count">{post.likedBy ? post.likedBy.length : 0} Likes</span>

                        <div className="comments-container">
                            {post.comments.map((comment, index) => (
                                <div key={comment.id} className="comment-card">
                                    <p><strong>{getCommentCreatorUsername(comment.userId)}:</strong> {comment.content}</p>
                                    {comment.userId === currentUser.id && (
                                        <button
                                            onClick={() => removeComment(post.id, index)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="add-comment">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                            />
                            <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
                        </div>

                        {post.userId === currentUser.id && (
                            <button onClick={() => removePost(post.id)}>
                                Delete Post
                            </button>
                        )}
                    </div>
                ))
            )}

        </div>
    );
};

export default PostsPage;
