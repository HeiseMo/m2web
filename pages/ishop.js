'use client'

import React, { useState, useEffect } from 'react';
import './styles.css'; // Ensure this CSS file contains the styles provided below
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Shop = ({ user }) => {
  const [items, setItems] = useState([]);  // Initialize as an empty array
  const [search, setSearch] = useState(''); // New state for search input
  const [accountName, setAccountName] = useState('');
  const [isAuthChecked, setIsAuthChecked] = useState(false); // New state to track authentication check
  const router = useRouter();


  if (!accountName) {
    return <div className="empty-state">No account data available.</div>;
  }
  
};

export default Shop;
