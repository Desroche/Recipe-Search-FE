import React, { useState } from 'react';
import NavigationBar from '../Navigation/NavigationBar';
import useProfileData from '../../hooks/useProfileData';

const UserProfile = () => {
    const { profileData, setProfileData, loading, error } = useProfileData();
    const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);
    const [isEditEmailModalOpen, setIsEditEmailModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

    const openEditNameModal = () => setIsEditNameModalOpen(true);
    const closeEditNameModal = () => setIsEditNameModalOpen(false);

    const openEditEmailModal = () => setIsEditEmailModalOpen(true);
    const closeEditEmailModal = () => setIsEditEmailModalOpen(false);

    const openChangePasswordModal = () => setIsChangePasswordModalOpen(true);
    const closeChangePasswordModal = () => setIsChangePasswordModalOpen(false);

    const openDeleteAccountModal = () => setIsDeleteAccountModalOpen(true);
    const closeDeleteAccountModal = () => setIsDeleteAccountModalOpen(false);



    const handleEditName = async (event) => {
        event.preventDefault();
        const newName = event.target.newName.value;
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/auth/user/profile/updateName', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: newName })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
      
            setProfileData(prevData => ({ ...prevData, name: newName }));
            alert('Name updated successfully!');

        } catch (error) {
            alert('Error updating name: ' + error.message);
        } finally {
            closeEditNameModal();
        }
    };
    




    const handleEditEmail = async (event) => {
        event.preventDefault();
        const newEmail = event.target.newEmail.value;
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/auth/user/profile/updateEmail', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email: newEmail })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            setProfileData(prevData => ({ ...prevData, email: newEmail }));
            alert('Email updated successfully!');

        } catch (error) {
            alert('Error updating email: ' + error.message);
        } finally {
            closeEditEmailModal();
        }
    };
    

    const handleChangePassword = async (event) => {
        event.preventDefault();
        const oldPassword = event.target.oldPassword.value;
        const newPassword = event.target.newPassword.value;
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/auth/user/profile/changePassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ oldPassword, newPassword })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            alert('Password changed successfully!');
        } catch (error) {
            alert('Error changing password: ' + error.message);
        } finally {
            closeChangePasswordModal();
        }
    };


    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/auth/user/profile/delete', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
              
            localStorage.removeItem('token');
            localStorage.removeItem('username');
    
            alert('Account deleted successfully. Redirecting to home page...');
            window.location.href = '/';

        } catch (error) {
            alert('Error deleting account: ' + error.message);
        }
    };
     

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <>
            <NavigationBar />
            <div className="flex justify-center mt-6">
                <div style={{ backgroundColor: "#f5f5dc" }} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 max-w-lg w-full">
                    <h1 className="text-2xl font-bold mb-4">User Profile:</h1>
            
                    <div className="space-y-4">
                        <p className="text-lg"><span className="font-bold">Username:</span> {profileData.username}</p>
                        <p className="text-lg"><span className="font-bold">Name:</span> {profileData.name || 'Not yet provided.'}</p>
                        <p className="text-lg"><span className="font-bold">Email:</span> {profileData.email}</p>
                        <p className="text-lg"><span className="font-bold">Registration Date:</span> {new Date(profileData.createdAt).toLocaleDateString()}</p>
                        <p className="text-lg"><span className="font-bold">Verification Status:</span> {profileData.isVerified ? 'Verified' : 'Not Verified'}</p>
                        <p className="text-lg"><span className="font-bold">Membership Level:</span> {profileData.membershipLevel}</p>
                        <p className="text-lg"><span className="font-bold">Role:</span> {profileData.role}</p>
                    </div>

                    <div className="mt-4">
                        <button onClick={openEditNameModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit Name</button>
                        <button onClick={openEditEmailModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit Email</button>
                    </div>

                    <div className="mt-6">
                        <button onClick={openChangePasswordModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">Change Password</button>
                    </div>

                    <div className="mt-4">
                        <button onClick={openDeleteAccountModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Account </button>
                    </div>

                    {
                        isEditNameModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={closeEditNameModal}>&times;</span>
                                    <form onSubmit={handleEditName}>
                                        <label htmlFor="newName">New Name:</label>
                                        <input type="text" id="newName" name="newName" required />
                                        <button type="submit" className="bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                                    </form>
                                </div>
                            </div>
                        )
                    }

                    {
                        isEditEmailModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={closeEditEmailModal}>&times;</span>
                                    <form onSubmit={handleEditEmail}>
                                        <label htmlFor="newEmail">New Email:</label>
                                        <input type="email" id="newEmail" name="newEmail" required />
                                        <button type="submit" className="bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                                    </form>
                                </div>
                            </div>
                        )
                    }

                    {
                        isChangePasswordModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={closeChangePasswordModal}>&times;</span>
                                    <form onSubmit={handleChangePassword}>
                                        <label htmlFor="oldPassword">Old Password:</label>
                                        <input type="password" id="oldPassword" name="oldPassword" required />

                                        <label htmlFor="newPassword">New Password:</label>
                                        <input type="password" id="newPassword" name="newPassword" required />

                                        <button type="submit" className="bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                                    </form>
                                </div>
                            </div>
                        )
                    }

                    {
                        isDeleteAccountModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={closeDeleteAccountModal}>&times;</span>
                                    <h3>Are you sure you want to delete your account?</h3>
                                    <p>This action cannot be undone.</p>
                                    <button onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Confirm Delete
                                    </button>
                                    <button onClick={closeDeleteAccountModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    );
};

export default UserProfile;







/*



*/





