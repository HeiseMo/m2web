'use client'

import React, { useState, useEffect } from 'react';
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
    <div className="containerBody">
      <div className="accountGreeting">
          Welcome, {accountName}!
        </div>
        <div>
        <div className="buttonContainer">
        <button className="bigSquareButton">
          Shop
        </button>
        <button className="bigSquareButton">
          Account Settings
        </button>
      </div>
        </div>

    </div>
  );
}
export default Dashboard;

