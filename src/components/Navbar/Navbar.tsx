import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
    filterPosts: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ filterPosts }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query); // Input değerini state'e güncelliyoruz
        filterPosts(query); // Üst komponente (Home) query'i iletiyoruz
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="navbar">
            <Link to="/home" className="navbar-logo">
                <h2 className="navbar-brand">Blog App</h2>
            </Link>
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className="navbar-links">
                <Link to="/home" className="navbar-link">
                    Home
                </Link>
                <Link to="/profile" className="navbar-link">
                    Profile
                </Link>
                <button onClick={handleLogout} className="navbar-link">
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Navbar;
