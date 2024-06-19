import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const threshold = documentHeight - windowHeight - 20;

            if (scrollTop > threshold) {
                setShowFooter(true);
            } else {
                setShowFooter(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className={`footer ${showFooter ? 'show' : ''}`}>
            <div className="footer-content">
                <p>&copy; 2024 Blog App. All rights reserved.</p>
                <div className="social-icons">
                </div>
            </div>
        </footer>
    );
};

export default Footer;