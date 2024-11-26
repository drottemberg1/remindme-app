import './EmailInput.styles.css'

import React, { useState } from 'react';

const EmailInput = ({ label, onChange }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!validateEmail(value)) {
            setError('Invalid email address');
        } else {
            setError('');
        }

        // Pass the email value to parent component
        if (onChange) onChange(value);
    };

    return (
        <div className="email-input-container">
            {label && <label className="email-input-label">{label}</label>}
            <input
                type="email"
                value={email}
                onChange={handleInputChange}
                className={`email-input ${error ? 'email-input-error' : ''}`}
                placeholder="Enter your email"
                required
            />
            {error && <p className="email-input-error-text">{error}</p>}
        </div>
    );
};

export default EmailInput;