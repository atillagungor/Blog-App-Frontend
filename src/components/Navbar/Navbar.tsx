import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

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
                <input type="text" placeholder="Search..." className="search-input" />
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