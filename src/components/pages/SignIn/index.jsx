import "./SignIn.styles.css";

import { Button, EmailInput, PasswordInput } from "../../presentational";
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { AuthLayout } from "../../layouts"
import { WTUtils, WTClient } from "SDK"

const SignIn = () => {


  return (
    <AuthLayout>
      <SigninForm />
    </AuthLayout>
  );
};

export default SignIn;


const SigninForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    window.showLoader();

    try {
      await WTClient.getInstance().login(email, password);
      setSuccessMessage('Sign In successful!');
      window.location.reload();
    } catch (e) {
        setError(e.message);
        //alert(e.message);
    } finally {
      window.hideLoader();
    }
  };

  return (
    <form className="signin-form">
      <h2>Sign In</h2>
      <EmailInput label="Email" onChange={setEmail} />
      <PasswordInput label="Password" onChange={setPassword} />
      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}
      <Button name="Sign In" onClick={handleSubmit} />

    </form>
  );
};
