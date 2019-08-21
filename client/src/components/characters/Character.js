// Todo single character page
import React, { useEffect, useState } from "react";
import axios from "axios";

const Character = ({ match }) => {
  const [player, setPlayer] = useState({});

  useEffect(() => {
    getPlayer(match.params.id);
  }, []);

  const getPlayer = async () => {
    const res = await axios.get(
      `http://localhost:5000/players/${match.params.id}`
    );
    setPlayer(res.data);
    // console.log(res.data);
  };

  return (
    <div>
      <p>Character{player.name}</p>
    </div>
  );
};

export default Character;
