import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostFormModal.css';
import { BASE_API_URL } from '../../environment/environment';
import UserService from '../../Services/UserService';
import { UserGetResponseModel } from '../../Models/Responses/User/UserGetResponseModel';

interface Category {
    id: string;
    name: string;
}

interface PostFormModalProps {
    onClose: () => void;
}

const PostFormModal: React.FC<PostFormModalProps> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserGetResponseModel | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/Category/getall`, {
                    params: {
                        PageIndex: 0,
                        PageSize: 10
                    }
                });
                console.log('Categories API response:', response.data);
                if (response.data && response.data.items) {
                    setCategories(response.data.items);
                    setError(null);
                } else {
                    setError('No categories available');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Error fetching categories');
            }
        };

        fetchCategories();
    }, []);

    const handleUserFetch = async (email: string) => {
        try {
            const response = await UserService.getByMail(email);
            console.log('User:', response.data);
            setSelectedUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            setError('Error fetching user');
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const userId = selectedUser ? selectedUser.id : '';
            const response = await axios.post(`${BASE_API_URL}/Post/add`, { title, content, userId });
            console.log('Post added:', response.data);
            onClose();
        } catch (error) {
            console.error('Error adding post:', error);
            setError('Error adding post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-form-modal">
            <h2>Create a New Post</h2>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="content">Content:</label>
                <textarea id="content" value={content} onChange={e => setContent(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select id="category" onChange={e => console.log(e.target.value)} defaultValue="">
                    <option value="" disabled>Select category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="email">User Email:</label>
                <input type="email" id="email" onBlur={e => handleUserFetch(e.target.value)} />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="modal-buttons">
                <button onClick={handleSubmit} disabled={loading} className="add-button">
                    {loading ? 'Adding...' : 'Add Post'}
                </button>
                <button onClick={onClose} className="cancel-button" disabled={loading}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PostFormModal;
