'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
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
    <div className={styles.containerBody}>
      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={400}
            height={400}
          />
        </div>
        <div className={styles.formGroup}>
          <button 
            type="submit" 
            className={styles.loginButton}
            onClick={toggleForm}>
            {showLoginForm ? "Register Form" : "Login Page"}
          </button>
        </div>
      </main>
      <div>
        {showLoginForm ? <LoginForm /> : <RegistrationForm />}
      </div>
      <ToastContainer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { token } = parseCookies(context);
  return { props: { token: token || null } };
}

/*OLD*/