import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();  // Initialize the navigate function from react-router-dom

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('http://localhost:2002/getAllPosts');
                const result = await res.json();

                if (result.success) {
                    setPosts(result.posts);
                } else {
                    alert('Failed to fetch posts');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                alert('An error occurred while fetching posts');
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        const response = await fetch(`http://localhost:2002/deletePost/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Optional, if token required
            },
        });
        const data = await response.json();

        if (data.success) {
            console.log("Post deleted successfully");

            // Update the state to remove the deleted post from the list
            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        } else {
            console.error("Error deleting post:", data.message);
        }
    };

    const handlePostClick = (postId) => {
        // Navigate to the reservation page, passing the post ID in the URL (you can change this to whatever you want)
        navigate(`/reservation/${postId}`);
    };

    return (
        <div>
            <h2>Movie Posts</h2>
            <div>
                {posts.map(post => (
                    <div className="d-flex wrap border p10 gap10" key={post._id}>
                        <div className="grow1 d-flex justify-content-center" onClick={() => handlePostClick(post._id)}> {/* Added onClick to the image */}
                            <img className="movieImg" src={post.imageUrl} alt={post.title} />
                        </div>
                        <div className="grow3">
                            <h1><b>{post.title}</b></h1>
                            <p>{post.description}</p>
                            <p>Seats available: {post.seats.filter(seat => !seat).length}/{post.seats.length}</p>
                            <button onClick={() => handleDelete(post._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
