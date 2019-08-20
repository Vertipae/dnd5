import React, { useEffect, useState } from "react";
import axios from "axios";

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    const res = await axios.get("http://localhost:5000/games");
    setGames(res.data);
    console.log(res.data);
  };

  return (
    <div>
      <ul className='collection with-header'>
        <li className='collection-header brown lighten-5'>
          <h5>Games</h5>
        </li>

        {games.map(game => (
          <li className='collection-item' key={game.id}>
            {game.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;
