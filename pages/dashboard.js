import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import "./styles.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  const [accountName, setAccountName] = useState('');
  const [isAuthChecked, setIsAuthChecked] = useState(false); // New state to track authentication check
  const router = useRouter();

  useEffect(() => {
    const fetchAccountName = async () => {
      // Make a request to your Next.js API route
      const response = await fetch('/api/getAccount');
      if (response.ok) {
        const data = await response.json();
        setIsAuthChecked(true)
        setAccountName(data.accountName);
      } else {
        // Handle errors, redirect to login, etc.
      }
    };
  
    fetchAccountName();
  }, []);

  const handleShopClick = () => {
    router.push('/ishop');
  }
  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch('/api/logout', { method: 'POST' });
        if (response.ok) {
          // Redirect to the home page or login page after successful logout
          toast.success('You have logged out!')
          router.push('/');
        } else {
          // Handle any errors returned from the server
          toast.error('Failed to logout');
        }
      } catch (error) {
        // Handle any exceptions during fetch
        toast.error('An error occurred during logout', error);
      }
    }
  };
  useEffect(() => {
    if (!isAuthChecked) {
      router.push('/');
    }
  }, [isAuthChecked]); 

  return (

    <div className="containerBodyDash">
      <div className="top-nav">
        <div className="accountGreeting">Welcome, {accountName}!</div>
        <div className="nav-links">
          <button onClick={handleLogout} className="logoutButton">Logout</button>
        </div>
      </div>
      <div className="buttonContainer">
        <button className="bigSquareButton" onClick={handleShopClick}>
          Shop
        </button>

      </div>
      <ToastContainer />
    </div>
  );
}
export default Dashboard;

