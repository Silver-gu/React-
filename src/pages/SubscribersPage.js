import React, { useState, useEffect } from "react";
import http from "../plugins/https";
import mainStore from "../store/main";  // Import the store for accessing user data

const SubscribersPage = () => {
    const { user } = mainStore(state => state);  // Access the user data from the store
    const [subscribers, setSubscribers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user || !user._id) {
            setError("User not logged in.");
            return;
        }

        const fetchSubscribers = async () => {
            try {
                const res = await http.getToken(`http://localhost:2002/getUsersWhoFavorited/${user._id}`);

                if (res.success) {
                    setSubscribers(res.usersWhoFavorited);  // Set the list of subscribers
                } else {
                    setError("Error fetching subscribers.");
                }
            } catch (error) {
                console.error("Error fetching subscribers:", error);
                setError("An error occurred while fetching subscribers.");
            }
        };

        fetchSubscribers();
    }, [user]);

    return (
        <div>
            <h2>Subscribers</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <div>
                {subscribers.map(subscriber => (
                    <div key={subscriber._id}>{subscriber.username}</div>
                ))}
            </div>
        </div>
    );
};

export default SubscribersPage;
