import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    const res = await axios.get("http://localhost:5000/players");
    setPlayers(res.data);
    console.log(res.data);
  };

  return (
    <div>
      <ul className='collection with-header'>
        <li className='collection-header brown lighten-5'>
          <h5>Characters</h5>
        </li>
        {players.map(player => (
          <Link to={`player/${player.id}`}>
            <li className='collection-item' key={player.id}>
              {player.name} {player.race} {player.class}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Characters;
