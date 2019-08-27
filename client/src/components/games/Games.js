import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames();
    // eslint-disable-next-line
  }, []);

  const getGames = async () => {
    const res = await axios.get("http://localhost:5000/games");
    setGames(res.data);
    // console.log(res.data);
  };

  return (
    <div>
      <ul className='collection with-header'>
        <li className='collection-header brown lighten-5'>
          <h5>Games</h5>
        </li>

        {games.map(game => (
          <Link key={game.id} to={`game/${game.id}`}>
            <li className='collection-item'>{game.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Games;
