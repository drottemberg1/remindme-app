import './TextInput.styles.css'

import React, { useState } from 'react';

const TextInput = ({ label, onChange }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setName(value);


        // Pass the email value to parent component
        if (onChange) onChange(value);
    };

    return (
        <div className="email-input-container">
            {label && <label className="email-input-label">{label}</label>}
            <input
                type="text"
                value={name}
                onChange={handleInputChange}
                className={`email-input ${error ? 'email-input-error' : ''}`}
                placeholder="Enter your text"
                required
            />
            {error && <p className="email-input-error-text">{error}</p>}
        </div>
    );
};

export default TextInput;
