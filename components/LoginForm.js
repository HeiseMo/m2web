'use client'

import React, { useState } from 'react';
import styles from '../styles/page.module.css'; // Update the path as needed
import { toast } from 'react-toastify';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Construct a payload
    const payload = {
      username,
      password,
    };

    try {
      // Send a request to the backend server for login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (response.ok) {
        setUsername('');
        setPassword('');
        toast.success('Login successful!'); // Show success message
        // Perform further actions here upon successful login, like redirecting the user
      } else {
        toast.error(data.message); // Show error message from the server
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred, please try again.');
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <form className={styles.registrationForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required value={username} onChange={handleUsernameChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required value={password} onChange={handlePasswordChange} />
        </div>
        <div className={styles.customButtons}>
          <button type="submit" className={styles.submitButton}>Login</button>
        </div>
      </form>
    </div>
  );
}
