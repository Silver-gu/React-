import React, { useEffect, useState } from 'react';
import http from "../plugins/https";
import mainStore from "../store/main";  // Assuming this store manages user state

const UsersPage = () => {
    const [items, setItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const user = mainStore(state => state.user); // Access logged-in user

    useEffect(() => {
        // Fetch all users when the component mounts
        http.getToken("http://localhost:2002/allUsers")
            .then(res => {
                if (res.success) {
                    setItems(res.allUsers);
                }
            })
            .catch(error => {
                console.error("Error fetching users: ", error);
            });

        // Fetch favorites for the logged-in user
        if (user) {
            http.getToken(`http://localhost:2002/getFavorites/${user._id}`)
                .then(res => {
                    if (res.success) {
                        setFavorites(res.favorites);
                    }
                })
                .catch(error => {
                    console.error("Error fetching favorites: ", error);
                });
        }
    }, [user]);

    const handleAddFavorite = (userItem) => {
        if (!user) {
            alert("Please log in to add favorites.");
            return;
        }

        // Ensure correct data is being sent
        http.postToken("http://localhost:2002/addFavorite", {
            userId: user._id,
            favoriteUserId: userItem._id
        })
            .then(res => {
                if (res.success) {
                    setFavorites(prevFavorites => [...prevFavorites, userItem]);
                } else {
                    alert("Error adding to favorites: " + res.message);
                }
            })
            .catch(error => {
                console.error("Error adding to favorites:", error);
                alert("Error adding to favorites");
            });
    };

    return (
        <div>
            <h1>All Users</h1>
            <div>
                {items.length > 0 ? (
                    <div className="d-flex wrap gap10">
                        {items.map((userItem, index) => (
                            <div className="border p10 gap10" key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <img src={userItem.profileImage} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '15px' }} />
                                <p>{userItem.username}</p>
                                <button onClick={() => handleAddFavorite(userItem)}>Add to Favorite</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default UsersPage;
