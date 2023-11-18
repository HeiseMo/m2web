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

  const handleBuyItem = async (item, quantity) => {
    if (quantity > 0) {
      try {
        const response = await fetch('/api/buyItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vnum: item.vnum,
            quantity: quantity,
          }),
        });

        if (response.ok) {
          // Handle successful purchase here
          toast.success('Purchase successful');
        } else {
          // Handle errors
          toast.error('Purchase failed');
        }
      } catch (error) {
        toast.error('Error making purchase:', error);
      }
    } else {
      // Handle case where quantity is not positive
      toast.error('Quantity must be greater than 0');
    }
  };

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const itemsResponse = await fetch('/api/getItems');
        const itemsData = await itemsResponse.json();
  
        const descriptionsResponse = await fetch('/itemdesc.json');
        const descriptionsData = await descriptionsResponse.json();
  
        // Assuming descriptionsData is an array of objects
        const descMap = descriptionsData.reduce((map, itemDesc) => {
          map[itemDesc.vnum] = itemDesc.description;
          return map;
        }, {});
  
        // Merge descriptions into items
        const mergedData = itemsData.map(item => ({
          ...item,
          description: descMap[item.vnum] || 'No description available'
        }));
  
        setItems(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error appropriately
      }
    };
  
    fetchItemsData();
  }, []);
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
        if (!isAuthChecked) {
          router.push('/dashboard');
          return null; // Or a loading spinner, etc.
        }
      }
    };
  
    fetchAccountName();
  }, []);
  const handleSearchChange = (event) => {
    setSearch(event.target.value); // Update the search state with user input
  };
  const filteredItems = items.filter(item => {
    return item.readable_locale_name.toLowerCase().includes(search.toLowerCase()); // Filter items based on search
  });
  const handleShopClick = () => {
    router.push('/dashboard');
  }
  if (!accountName) {
    return <div className="empty-state">No account data available.</div>;
  }
  return (
    <div className="webshop-page">
<ToastContainer />
      {/* Navigation Bar */}
      <nav className="top-nav">
        <div className="logo">Davos2 WebShop</div>
        <div className="nav-links">
          <button className='dashboardBtn' onClick={handleShopClick}>Dashboard</button>
          <button className='myProfile'>{accountName}</button>
        </div>
      </nav>

      {/* Search Container */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
    <div className='containerBodyShop'>
      
<div className="items-list-container">
{filteredItems.map(item => (
        <div key={item.vnum} className="item-card">
          <img src={item.imageUrl} alt={item.readable_locale_name} className="item-image"/>
          <div className="item-info">
            <h3 className="item-title">{item.readable_locale_name}</h3>
            <p className="item-description">{item.description}</p>
            <p className="item-vnum">{item.vnum}</p>
          </div>
          <div className="item-footer">
          <input
                type="number"
                min="1"
                className="item-quantity-input"
                placeholder="Qty"
                onChange={(e) => item.quantity = e.target.value} // Update item.quantity on change
              />
              <button
                className="buy-button"
                onClick={() => handleBuyItem(item, item.quantity)} // Pass item and quantity to handleBuyItem
              >
                Buy
              </button>
          </div>
        </div>
      ))}
</div>
</div>
<footer className="webshop-footer">
        <p>© 2023 Davos2 No Cash WebShop. All rights reserved.</p>
      </footer>
      
  </div>

  );
};

export default Shop;
