import React, { useState, useEffect } from "react";
import http from "../plugins/https";
import mainStore from "../store/main";

const Profile = () => {
    const { user, setUser } = mainStore(state => state);
    const [newProfileImage, setNewProfileImage] = useState("");
    const [newUsername, setNewUsername] = useState(user.username);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [usersWhoFavoritedCount, setUsersWhoFavoritedCount] = useState(0);
    const [passwordToDelete, setPasswordToDelete] = useState("");  // Password field for deletion
    const [deleteError, setDeleteError] = useState("");  // Err

    useEffect(() => {
        const fetchUsersWhoFavoritedCount = async () => {
            try {
                const res = await http.getToken(`http://localhost:2002/getUsersWhoFavorited/${user._id}`);
                if (res.success) {
                    setUsersWhoFavoritedCount(res.usersWhoFavorited.length); // Update the count
                } else {
                    setError("Error fetching the number of users who added you to favorites.");
                }
            } catch (error) {
                console.error("Error fetching users who favorited:", error);
                setError("An error occurred while fetching the users who favorited you.");
            }
        };

        fetchUsersWhoFavoritedCount();
    }, [user._id]); // Only run when user._id changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newProfileImage) {
            setError("Please provide a profile image URL.");
            return;
        }

        const res = await http.postToken("http://localhost:2002/updateProfileImage", {
            username: user.username,
            profileImage: newProfileImage,
        });

        if (res.success) {
            setUser({ ...user, profileImage: res.updatedUser.profileImage });
            setNewProfileImage("");
            setError("");
        } else {
            setError(res.message || "Error updating profile image.");
        }
    };

    const handleUsernameChange = async (e) => {
        e.preventDefault();

        if (newUsername === user.username) {
            setUsernameError("Your username is the same as the current one.");
            return;
        }

        try {
            const res = await http.postToken("http://localhost:2002/updateUsername", {
                oldUsername: user.username,
                newUsername: newUsername,
            });

            if (res.success) {
                setUser({ ...user, username: newUsername });
                setSuccessMessage("Username updated successfully!");
                setUsernameError(""); // Clear any previous error
                setNewUsername(""); // Reset the input field
            } else {
                setUsernameError(res.message || "Error updating username.");
            }
        } catch (error) {
            console.error("Error updating username: ", error);
            setUsernameError("An error occurred while updating the username.");
        }
    };
    const handleDeleteAccount = async (e) => {
        e.preventDefault();

        if (!passwordToDelete) {
            setDeleteError("Please enter your password to confirm.");
            return;
        }

        try {
            const res = await http.postToken("http://localhost:2002/deleteAccount", {
                userId: user._id,
                password: passwordToDelete,
            });

            if (res.success) {
                setUser(null);  // Clear user from state
                setPasswordToDelete("");  // Reset password input field
                setDeleteError("");  // Clear delete error

                // Redirect to the login/register page after successful deletion
                window.location.href = "/";  // Modify this based on your app's routing
            } else {
                setDeleteError(res.message || "Error deleting account.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            setDeleteError("An error occurred while deleting the account.");
        }
    };

    return (
        <div
            style={{maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px"}}>
            <h2>Profile</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            {successMessage && <p style={{color: "green"}}>{successMessage}</p>}

            <img
                src={user.profileImage}
                alt="Profile"
                style={{width: "150px", height: "150px", borderRadius: "50%", margin: "10px"}}
            />

            <input
                type="text"
                value={newProfileImage}
                onChange={(e) => setNewProfileImage(e.target.value)}
                placeholder="Enter new profile image URL"
                style={{display: "block", marginBottom: "10px", width: "100%", padding: "8px"}}
            />
            <button
                onClick={handleSubmit}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Update Profile Image
            </button>

            <hr style={{margin: "20px 0"}}/>

            <h3>Change Username</h3>
            <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new username"
                style={{display: "block", marginBottom: "10px", width: "100%", padding: "8px"}}
            />
            {usernameError && <p style={{color: "red"}}>{usernameError}</p>}
            {successMessage && <p style={{color: "green"}}>{successMessage}</p>}
            <button
                onClick={handleUsernameChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Update Username
            </button>
            <hr/>
            <h4>Subscribers: <b style={{color: "blue"}}>{usersWhoFavoritedCount}</b></h4>
            <hr/>

            <h3>Delete Account</h3>
            <input
                type="password"
                value={passwordToDelete}
                onChange={(e) => setPasswordToDelete(e.target.value)}
                placeholder="Enter your password to confirm"
                style={{display: "block", marginBottom: "10px", width: "100%", padding: "8px"}}
            />
            {deleteError && <p style={{color: "red"}}>{deleteError}</p>}
            <button
                onClick={handleDeleteAccount}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Delete Account
            </button>
        </div>
    );
};

export default Profile;
