import React, { useState, useEffect } from 'react';

// A simple function component that uses state and effects to fetch and render the data
const PlayersList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch items from your API on component mount
    const fetchPlayers = async () => {
        try {
          const response = await fetch('/api/playerCount');
          const data = await response.json();
          // Assuming the player data is always in the first array
          setPlayers(data[0]);
        } catch (error) {
          console.error('Error fetching players:', error);
        }
      };

    fetchPlayers();
  }, []);
  console.log(players)
  return (
<div className="player-container">
  {players.map((player) => (
    <div key={player.id} className="player-item">
      <div className="player-detail"><span className="label">Name:</span> {player.name}</div>
      <div className="player-detail"><span className="label">Level:</span> {player.level}</div>
      <div className="player-detail">
        <span className="label">EXP:</span> {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(player.exp)}
      </div>
      <div className="player-detail">
        <span className="label">Gold:</span> {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(player.gold)}
      </div>
    </div>
  ))}
</div>


  );
};

export default PlayersList;
