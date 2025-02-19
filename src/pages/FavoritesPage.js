import React, { useEffect, useState } from 'react';
import http from "../plugins/https";
import mainStore from "../store/main";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const user = mainStore(state => state.user);

    useEffect(() => {
        if (user) {
            http.getToken(`http://localhost:2002/getFavorites/${user._id}`)
                .then(res => {
                    console.log("Fetched Favorites: ", res.favorites);
                    if (res.success) {
                        setFavorites(res.favorites);
                    } else {
                        console.error("Error fetching favorites:", res.message);
                    }
                })
                .catch(error => {
                    console.error("Error fetching favorites:", error);
                });
        }
    }, [user]);

    const handleRemoveFavorite = (favoriteUserId) => {
        // Make API call to remove from favorites
        http.postToken('http://localhost:2002/removeFavorite', {
            userId: user._id,
            favoriteUserId: favoriteUserId,
        }).then(res => {
            if (res.success) {
                // Update the state to remove the favorite
                setFavorites(favorites.filter(favorite => favorite._id !== favoriteUserId));
            } else {
                console.error("Error removing favorite:", res.message);
            }
        }).catch(error => {
            console.error("Error removing favorite:", error);
        });
    };

    return (
        <div>
            <h1>Your Favorites</h1>
            <div>
                {favorites.length > 0 ? (
                    <div className="d-flex wrap gap10">
                        {favorites.map((favorite, index) => (
                            <div className="border p10 gap10" key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <img src={favorite.profileImage} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '15px' }} />
                                <p>{favorite.username}</p>
                                <button onClick={() => handleRemoveFavorite(favorite._id)} style={{ marginLeft: '10px' }}>Remove</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No favorites found.</p>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
