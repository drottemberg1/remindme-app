import "./SignUp.styles.css";

import { Button, EmailInput, PasswordInput, TextInput } from "../../presentational";
import React, { useState } from 'react';

import { AuthLayout } from "../../layouts"
import { useLocation, useNavigate } from "react-router-dom";
import { WTUtils , WTClient} from "SDK"

const SignUp = () => {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

export default SignUp;


const SignupForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {


    e.preventDefault();

    setError('');
    setSuccessMessage('');

    if(confirmPassword != password){
      setError('password not matching');
    }else{
      try {
        window.showLoader();

        await WTClient.getInstance().register(name, email, password);
        setSuccessMessage('Register successful!');
        navigate('/signin');
      } catch (e) {
          setError(e.message);
          //alert(e.message);
      } finally {
        window.hideLoader();
      }
    }

  };

  return (
    <form className="signup-form">
      <h2>Sign Up</h2>
      <TextInput label="Name" onChange={setName} />
      <EmailInput label="Email" onChange={setEmail} />
      <PasswordInput label="Password" onChange={setPassword} />
      <PasswordInput label="Confirm Password" onChange={setConfirmPassword} />
      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}
      <Button name="Sign Up" onClick={handleSubmit} />

      <div className="login-link-container">
        <p>
          Have an account?
          <span className="login-link" onClick={() => navigate('/signin')}> Sign In</span>
        </p>
      </div>
    </form>
  );
};
