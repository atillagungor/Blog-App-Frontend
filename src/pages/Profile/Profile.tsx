import React, { useEffect, useState } from 'react';
import './Profile.css';
import UserService from '../../Services/UserService';
import { UserGetResponseModel } from '../../Models/Responses/User/UserGetResponseModel';

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserGetResponseModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const loggedInUserEmail = 'string@mail.com';
                const response = await UserService.getByMail(loggedInUserEmail);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div className="loading-container">Loading user data...</div>;
    }

    if (error) {
        return <div className="error-container">{error}</div>;
    }

    if (!user) {
        return <div className="error-container">User not found.</div>;
    }

    return (
        <div className="profile-container">
            <h2 className="profile-header">Profile Page</h2>
            <div className="profile-details">
                <div>
                    <strong>First Name:</strong> {user.firstName}
                </div>
                <div>
                    <strong>Last Name:</strong> {user.lastName}
                </div>
                <div>
                    <strong>Email:</strong> {user.email}
                </div>
            </div>
        </div>
    );
};

export default Profile;