import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

const Games = () => {
  const games = useSelector(state => state.games.games);


  return (
    <div>
      <ul className='collection with-header'>
        <li className='collection-header brown lighten-5'>
          <h5>Games</h5>
        </li>

        {games.map((game, i) => (
          <Link key={game._id} to={`game/${game._id}`}>
            <li className='collection-item' style={{fontSize: "1.1em", marginTop:"0.5em", backgroundColor: i%2 !== 0 ? "#efebe9" : ""}}>{game.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Games;
