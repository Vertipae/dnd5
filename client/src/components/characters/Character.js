// Todo single character page
import React, { useEffect, useState } from "react";
import axios from "axios";

const Character = ({ match }) => {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    getCharacter(match.params.id);
  }, []);

  const getCharacter = async () => {
    const res = await axios.get(
      `http://localhost:5000/characters/${match.params.id}`
    );
    setCharacter(res.data);
    // console.log(res.data);
  };

  return (
    <div>
      <p>Character{character.name}</p>
    </div>
  );
};

export default Character;
