// Todo single character page
import React, { useEffect, useState } from "react";
import axios from "axios";

const Character = ({ match }) => {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    getCharacter(match.params.id);
    // eslint-disable-next-line
  }, []);

  const getCharacter = async () => {
    const res = await axios.get(
      `http://localhost:5000/characters/${match.params.id}`
    );
    setCharacter(res.data);
    // console.log(res.data);
  };

  return (
    <form>
      <div className='container' style={{ marginTop: "50px" }}>
        <div className='row'>
          {/* <div className='divider' /> */}
          <div className='col s6'>
            CHARACTER NAME: {character.name} {character.level}LEVEL
          </div>
          <div className='col s6 row'>
            <div className='col s4 center'>
              <label>Class Select</label>
              <select className='browser-default' defaultValue='0'>
                <option value='0' disabled>
                  Classes
                </option>
                <option value='1'>Option 1</option>
                <option value='2'>Option 2</option>
                <option value='3'>Option 3</option>
              </select>
            </div>
            <div className='col s4 center'>
              <label>Background Select</label>
              <select className='browser-default' defaultValue='0'>
                <option value='0' disabled>
                  Backgrounds
                </option>
                <option value='1'>Option 1</option>
                <option value='2'>Option 2</option>
                <option value='3'>Option 3</option>
              </select>
            </div>
            <div className='col s4 center'>
              <input placeholder='Player Name' />
            </div>
          </div>

          <div className='col s6 row right'>
            <div className='col s4 center'>
              <label>Race Select</label>
              <select className='browser-default' defaultValue='0'>
                <option value='0' disabled>
                  Races
                </option>
                <option value='1'>Option 1</option>
                <option value='2'>Option 2</option>
                <option value='3'>Option 3</option>
              </select>
            </div>
            <div className='col s4 center'>
              <label>Alignment Select</label>
              <select className='browser-default' defaultValue='0'>
                <option value='0' disabled>
                  Alignments
                </option>
                <option value='1'>Option 1</option>
                <option value='2'>Option 2</option>
                <option value='3'>Option 3</option>
              </select>
            </div>
            <div className='col s4 center'>
              <input placeholder='Experience points' />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Character;
