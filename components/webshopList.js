import React, { useState, useEffect } from 'react';

// A simple function component that uses state and effects to fetch and render the data
const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from your API on component mount
    const fetchItems = async () => {
      const response = await fetch('/api/webshopFeed');
      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  return (
    <div className="webshop-list">
      {items.map((item) => (
        <div key={(item.vnum) + 1} className="webshop-item">
          <div className="webshop-item-image">
            <img src={item.imageUrl} alt={`Icon for ${item.readable_locale_name}`} />
          </div>
          <div className="webshop-item-details">
            <div className="webshop-item-name">{item.readable_locale_name}</div>
            <div className="webshop-item-count">{item.count}</div>
            <div className="webshop-item-login">{item.login}</div>
            <div className="webshop-item-vnum">{item.vnum}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
