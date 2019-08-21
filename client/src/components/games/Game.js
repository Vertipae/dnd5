import React, { useEffect, useState } from "react";
import axios from "axios";

const Game = ({ match }) => {
  const [game, setGame] = useState({});

  useEffect(() => {
    getGame(match.params.id);
  }, []);

  const getGame = async () => {
    const res = await axios.get(
      `http://localhost:5000/games/${match.params.id}`
    );
    setGame(res.data);
    // console.log(res.data);
  };

  return (
    <div>
      <p>Game {game.name}</p>
    </div>
  );
};
export default Game;
