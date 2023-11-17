'use client'

import React, { useState, useEffect } from 'react';
import styles from '../styles/page.module.css';
import { useRouter } from 'next/router';
import "./styles.css";

const Dashboard = () => {
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    const fetchAccountName = async () => {
      // Make a request to your Next.js API route
      const response = await fetch('/api/getAccount');
      if (response.ok) {
        const data = await response.json();
        setAccountName(data.accountName);
      } else {
        // Handle errors, redirect to login, etc.
      }
    };
  
    fetchAccountName();
  }, []);


  return (
    <div className={styles.containerBody}>
      <div className={styles.accountGreeting}>
          Welcome, {accountName}!
        </div>
        <div>
        <div className={styles.buttonContainer}>
        <button className={styles.bigSquareButton}>
          Shop
        </button>
        <button className={styles.bigSquareButton}>
          Account Settings
        </button>
      </div>
        </div>

    </div>
  );
}
export default Dashboard;

