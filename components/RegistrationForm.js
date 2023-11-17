'use client'

import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [delcode, setDelcode] = useState('');


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleDelcodeChange = (e) => {
    setDelcode(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }
  
    // Construct a payload
    const payload = {
      username,
      email,
      password,
      delcode,
      // confirmPassword is typically not sent to the server
    };
  
    try {
      // Send a request to the backend server
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      
      // Reset form fields only on successful registration
      if (response.ok) {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        toast.success(data.message); // Show success message
      } else {
        toast.error(data.message); // Show error message from the server
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred, please try again.');
    }
}
  return (
    <div className="registrationContainer">
        <h1 className="title"></h1>
        <form className="registrationForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required value={username} onChange={handleUsernameChange} />
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required value={email} onChange={handleEmailChange} />
          </div>
          <div className="formGroup">
        <label htmlFor="delcode">Character Deletion Code</label>
        <input type="number" id="delcode" name="delcode" required value={delcode} onChange={handleDelcodeChange} min="1000000" max="9999999" placeholder="Must be 7 digits, only numbers" />
        </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required value={password} onChange={handlePasswordChange} />
          </div>
          <div className="formGroup">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </div>
          <div className="customButtons">
          <div className="formGroup">
            <button type="submit" className="submitButton">Register</button>
          </div>
          <div className="formGroup">
            <a href="https://drive.google.com/file/d/1SFbJw2929oK6CSYaFz3z24E5Uf0yUKiQ/view?usp=sharing" className="downloadButton" target="_blank" rel="noopener noreferrer">Download Client</a>
          </div>
          </div>
        </form>
      </div>
  );
}
