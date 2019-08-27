import React, { useEffect, useState } from "react";
import axios from "axios";

const Game = ({ match }) => {
  const [game, setGame] = useState({});

  useEffect(() => {
    getGame(match.params.id);
    // eslint-disable-next-line
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
      <p>
        Game {game.name}
        {/* {game.player} */}
      </p>
    </div>
  );
};
export default Game;
