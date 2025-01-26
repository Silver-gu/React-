import React, { useState } from 'react';
import useStore from '../store/main';
import '../App.css';

function ProfilePage() {
    const { currentUser, updateUser, logout, users } = useStore();
    const [newImageUrl, setNewImageUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [password, setPassword] = useState('');

    if (!currentUser) {

        return <div>Please log in first.</div>;
    }

    const handleImageChange = () => {
        if (newImageUrl) {

            const updatedUser = { ...currentUser, profileImage: newImageUrl };
            updateUser(updatedUser);

            setNewImageUrl('');
            setIsEditing(false);
        }
    };

    const handleCancel = () => {

        setNewImageUrl('');
        setIsEditing(false);
    };

    const handleDeleteAccount = () => {
        if (password === currentUser.password) {



            localStorage.removeItem('currentUser');


            const updatedUsers = users.filter(user => user.username !== currentUser.username);
            localStorage.setItem('users', JSON.stringify(updatedUsers));


            logout();

        }
        setIsDeleting(false);
        setPassword('');
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Profile Page</h1>
            <div className="profile-details">

                <img
                    src={currentUser.profileImage}
                    alt="Profile"
                    className="profile-image"
                />
                <div className="profile-info ">
                    <p>Username: {currentUser.username}</p>
                    <button onClick={() => setIsEditing(true)}>Change Image</button>
                    {isEditing && (
                        <div>
                            <input type="text" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="Enter new image URL"/>
                            <button onClick={handleImageChange}>Update Image</button>
                            <button onClick={handleCancel} className="cancel-button">Cancel</button>
                        </div>
                    )}
                    <div></div>
                    <button onClick={() => setIsDeleting(true)} className="delete-account-button">Delete Account</button>
                    {isDeleting && (
                        <div className="delete-account-confirmation">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>
                            <button onClick={handleDeleteAccount}>Confirm Delete</button>
                            <button onClick={() => setIsDeleting(false)} className="cancel-button">Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
