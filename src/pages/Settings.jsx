import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const Settings = () => {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        window.location.href = '/';
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <h2><strong>{username}'s settings</strong></h2>
                <p>Email: {email}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
};

export default Settings;