import React, { useState, useEffect } from 'react';
import useStore from '../store/main';
import '../App.css';

const ProfilePage = () => {
    const currentUser = useStore((state) => state.currentUser);
    const updateProfileImage = useStore((state) => state.updateProfileImage);
    const deleteAccount = useStore((state) => state.deleteAccount);
    const [showImageModal, setShowImageModal] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser) {
            const savedImageUrl = localStorage.getItem(`profileImage-${currentUser.username}`);
            if (savedImageUrl && savedImageUrl !== currentUser.profileImage) {
                updateProfileImage(savedImageUrl);
            }
        }
    }, [currentUser, updateProfileImage]);

    if (!currentUser) {
        return <p>Please log in to view your profile.</p>;
    }

    const handleImageUrlChange = (event) => {
        setNewImageUrl(event.target.value);
    };

    const handleSaveImage = () => {
        if (newImageUrl === currentUser.profileImage) {
            setShowImageModal(false);
            return;
        }

        updateProfileImage(newImageUrl);

        localStorage.setItem(`profileImage-${currentUser.username}`, newImageUrl);

        setShowImageModal(false);
    };

    const handleCancel = () => {
        setShowImageModal(false);
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError('');
    };

    const handleConfirmDelete = () => {
        if (password !== currentUser.password) {
            setError('Incorrect password. Please try again.');
            return;
        }

        if (window.confirm('Are you sure you want to delete your account? ')) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem(`profileImage-${currentUser.username}`);

            deleteAccount();
            window.location.href = '/login';
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setPassword('');
        setError('');
    };

    return (
        <div>
            <h2>{currentUser.username}'s Profile</h2>
            <div className="d-flex j-center gap20">
                <div>
                    <img
                        className="profileImg"
                        src={currentUser.profileImage || "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"}
                        alt="User Profile"
                    />
                </div>
                <div className="mt5 d-flex direction-col gap10">
                    <p>Username: {currentUser.username}</p>
                    <button className="registerButton" onClick={() => setShowImageModal(true)}>Update Image</button>
                    <button onClick={handleDeleteAccount} className="deleteAccountButton">Delete Account</button>
                    {showImageModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h3>Update Image</h3>
                                <input
                                    type="url"
                                    placeholder="Enter image URL"
                                    value={newImageUrl}
                                    onChange={handleImageUrlChange}
                                />
                                <div className="d-flex gap10">
                                    <button onClick={handleSaveImage}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showDeleteModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h3>Confirm Deletion</h3>
                                <p>Please enter your password to confirm account deletion.</p>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <div className="d-flex gap10">
                                    <button onClick={handleConfirmDelete}>Confirm Delete</button>
                                    <button onClick={handleCancelDelete}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
