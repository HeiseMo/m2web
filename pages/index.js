'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import "./styles.css";
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import dashboard from './dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from 'nookies'; // You may need to install nookies
import { useRouter } from 'next/router';

export default function Home({ token }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const router = useRouter();

  if (token) {
    // Redirect to the dashboard if token exists
    router.push('/dashboard');
    return null; // Prevent rendering while redirecting
  }

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="containerBody">
      <main className="main">
        <div className="logoContainer">
          <Image
            src="/logo.png"
            alt="Logo"
            width={400}
            height={400}
          />
        </div>
        <div className="formGroup">
          <button 
            type="submit" 
            className="loginButton"
            onClick={toggleForm}>
            {showLoginForm ? "Register Form" : "Login Page"}
          </button>
        </div>
      </main>
      <div className='formContainer'>
        {showLoginForm ? <LoginForm /> : <RegistrationForm />}
      </div>
      <ToastContainer />
    </div>
  );
}

export async function getServerSideProps(context) {
    const { token } = parseCookies(context);
  
    if (token) {
      return {
        redirect: {
          destination: '/dashboard', // Redirect to the dashboard page
          permanent: false, // Temporary redirect
        },
      };
    }
  
    return { props: {} };
  }