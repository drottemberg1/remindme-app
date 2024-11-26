import "./PasswordInput.styles.css";

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({ label, onChange }) => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="password-input-container">
      {label && <label className="password-input-label">{label}</label>}
      <div className="password-input-wrapper">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          value={password}
          onChange={handleInputChange}
          className="password-input"
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          {isPasswordVisible ? '🙈' : '👁️'}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;