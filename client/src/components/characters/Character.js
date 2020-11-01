// Todo single character page
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { addCharacter, deleteCharacter } from "../../actions/characterActions"

const Character = ({ match }) => {
  // const character = useSelector((state) => state.characters.filter(character => character._id === match.params.id)[0])
  const dispatch = useDispatch()
  const history  = useHistory()

  const [character, setCharacter] = useState(useSelector((state) => state.characters.characters.filter(character => character._id === match.params.id)[0]));
  // const [character, setCharacter] = useState(useSelector((state) => state.characters));
  console.log(character)
  // const [characterLevel, setCharacterLevel] = useState(" ");
  // const [name, setName ] = useState(" ");
  // const [characterRace, setCharacterRace] = useState(" ")
  // const [characterClass, setCharacterClass] = useState(" ")
  // const [characterAlignment, setCharacterAlignment] = useState(" ")

  // useEffect(() => {
  //   getCharacter(match.params.id);
  //   // console.log("Mounting")
  //   // setCharacterName("Seppo")
  //   // eslint-disable-next-line
  // }, []);

  // const getCharacter = async () => {
  //   const res = await axios.get(
  //     `http://localhost:5000/api/characters/${match.params.id}`
  //   );
  //   //setCharacter(res.data);
  //   setName(res.data.name)
  //   setCharacterLevel(res.data.level)
  //   setCharacterRace(res.data.race)
  //   setCharacterClass(res.data.characterClass)
  //   setCharacterAlignment(res.data.alignment)
  //   console.log("CHARACTER FETCHED", res.data);
  // };

  // const testDeleteChar = (e) => {
  //   e.preventDefault()
  //   console.log('Delete-nappi painettu')

  //   dispatch(deleteCharacter(null, null))
  // }
  // console.log("Render")

  if(!character) {
    return <div></div>
  }

  return (
    <div>
    <form>
      <div className="container">
        <div className="row">
          {/* <div className='divider' /> */}
          <div className="col s6">
            <div className="input-field col s4">
              <input id="characterName" type="text" value={character.name} onChange={(e) => setCharacter({...character, name: e.target.value})} />
              <label className="active">CHARACTER NAME:</label>
            </div>
            <div className="input-field col s4">
              <input id="level" type="text" value={character.level} onChange={(e) => setCharacter({...character, level: e.target.value})}/>
              <label className="active">LEVEL:</label>
            </div>
          </div>
        </div>

        <div className="col s12 row">
          <div className="col s4">
            <label>Race Select</label>
            <select className="browser-default" value={character.race}  onChange={(e) => setCharacter({...character, race: e.target.value})}>
              {/* <option value={characterRace} disabled>
                Races
              </option> */}
              <option value="Aasimar">Aasimar</option>
              <option value="Dragonborn">Dragonborn</option>
              <option value="Dwarf">Dwarf</option>
              <option value="Elf">Elf</option>
              <option value="Gnome">Gnome</option>
              <option value="Half-Elf">Half-Elf</option>
              <option value="Half-Orc">Half-Orc</option>
              <option value="Halfling">Halfling</option>
              <option value="Human">Human</option>
              <option value="Tiefling">Tiefling</option>
            </select>
          </div>

          <div className="col s4">
            <label>Class Select</label>
            <select className="browser-default" value={character.characterClass} onChange={(e) => setCharacter({...character, characterClass: e.target.value})}>
              {/* <option value={characterClass} disabled>
                Classes
              </option> */}
              <option value="Bard">Bard</option>
              <option value="Cleric">Cleric</option>
              <option value="Druid">Druid</option>
              <option value="Other">Other</option>
              <option value="Paladin">Paladin</option>
              <option value="Ranger">Ranger</option>
              <option value="Sorcerer">Sorcerer</option>
              <option value="Warlock">Warlock</option>
              <option value="Wizard">Wizard</option>
            </select>
          </div>

          <div className="col s4">
            <label>Alignment Select</label>
            <select className="browser-default" value={character.alignment} onChange={(e) => setCharacter({...character, alignment: e.target.value})}>
              {/* <option value={characterAlignment} disabled>
                Alignments
              </option> */}
              <option value="Lawful good">Lawful good</option>
              <option value="Lawful neutral">Lawful neutral</option>
              <option value="Lawful evil">Lawful evil</option>
              <option value="Neutral good">Neutral good</option>
              <option value="Neutral">Neutral</option>
              <option value="Neutral evil">Neutral evil</option>
              <option value="Chaotic good">Chaotic good</option>
              <option value="Chaotic neutral">Chaotic neutral</option>
              <option value="Chaotic evil">Chaotic evil</option>
            </select>
          </div>
        </div>
        <div className="row right">
          <div className="col">
            <button
              className="btn waves-effect waves-light  grey darken-1 myBtn"
              style={{ marginTop: "2em" }}
              name="action"
            >
              Cancel
              <i className="material-icons right">cancel</i>
            </button>
          </div>
          <div className="col ">
            <button
              className="btn waves-effect waves-light red darken-4 myBtn"
              style={{ marginTop: "2em" }}
              type="submit"
              name="action"
              onClick={(e) => {
                e.preventDefault()
                dispatch(deleteCharacter(character._id, history))
              }}
            >
              Delete
              <i className="material-icons right">delete</i>
            </button>
          </div>
          <div className="col ">
            <button
              className="btn waves-effect waves-light green darken-4 myBtn"
              style={{ marginTop: "2em" }}
              type="submit"
              name="action"
            >
              Save
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    </form>
    {/* <button onClick={(e) => dispatch(deleteCharacter(character._id))}>TestDeletebutton</button> */}
    </div>
  )
}

export default Character;
