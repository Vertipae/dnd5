import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addCharacter } from "../../actions/characterActions"
// Todo: Subrace(Dwarf => Hill Dwarf) & languages, experience points, background

const CreateCharacter = () => {
  // const characters = useSelector((state) => state.characters)
  const errors = useSelector((state) => state.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState("")
  const [race, setRace] = useState("0")
  const [characterClass, setCharacterClass] = useState("0")
  const [level, setLevel] = useState("")
  const [alignment, setAlignment] = useState("0")

  const onSubmit = (e) => {
    e.preventDefault()

    const newCharacter = {
      name,
      race,
      characterClass,
      level,
      alignment,
      // errors: {},
    }

    dispatch(addCharacter(newCharacter, history))
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='container'>
          <div className='row'>
            <div className='col s6'>
              <div className='input-field col s4'>
                <input
                  className={errors.name ? "invalid" : ""}
                  id='characterName'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>CHARACTER NAME:</label>
              </div>
              <div className='input-field col s4'>
                <input
                  className={errors.level ? "invalid" : ""}
                  id='level'
                  type='text'
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                />
                <label>LEVEL:</label>
              </div>
            </div>
          </div>

          <div className='col s12 row'>
            <div className='col s4'>
              <label>Race Select</label>
              <select
                // className={`browser-default ${errors.race && "invalid"}`}
                className='browser-default'
                style={{ borderColor: errors.race ? "red" : "" }}
                value={race}
                onChange={(e) => setRace(e.target.value)}
              >
                <option value='0' disabled>
                  Races
                </option>
                <option value='Aasimar'>Aasimar</option>
                <option value='Dragonborn'>Dragonborn</option>
                <option value='Dwarf'>Dwarf</option>
                <option value='Elf'>Elf</option>
                <option value='Gnome'>Gnome</option>
                <option value='Half-Elf'>Half-Elf</option>
                <option value='Half-Orc'>Half-Orc</option>
                <option value='Halfling'>Halfling</option>
                <option value='Human'>Human</option>
                <option value='Tiefling'>Tiefling</option>
              </select>
            </div>

            <div className='col s4'>
              <label>Class Select</label>
              <select
                className='browser-default'
                style={{ borderColor: errors.characterClass ? "red" : "" }}
                value={characterClass}
                onChange={(e) => setCharacterClass(e.target.value)}
              >
                <option value='0' disabled>
                  Classes
                </option>
                <option value='Bard'>Bard</option>
                <option value='Cleric'>Cleric</option>
                <option value='Druid'>Druid</option>
                <option value='Other'>Other</option>
                <option value='Paladin'>Paladin</option>
                <option value='Ranger'>Ranger</option>
                <option value='Sorcerer'>Sorcerer</option>
                <option value='Warlock'>Warlock</option>
                <option value='Wizard'>Wizard</option>
              </select>
            </div>

            <div className='col s4'>
              <label>Alignment Select</label>
              <select
                className='browser-default'
                value={alignment}
                onChange={(e) => setAlignment(e.target.value)}
              >
                <option value='0' disabled>
                  Alignments
                </option>
                <option value='Lawful good'>Lawful good</option>
                <option value='Lawful neutral'>Lawful neutral</option>
                <option value='Lawful evil'>Lawful evil</option>
                <option value='Neutral good'>Neutral good</option>
                <option value='Neutral'>Neutral</option>
                <option value='Neutral evil'>Neutral evil</option>
                <option value='Chaotic good'>Chaotic good</option>
                <option value='Chaotic neutral'>Chaotic neutral</option>
                <option value='Chaotic evil'>Chaotic evil</option>
              </select>
            </div>
          </div>
          <div className='row right'>
            <div className='col'>
              <button
                className='btn waves-effect waves-light  grey darken-1 myBtn'
                style={{ marginTop: "2em" }}
                name='action'
                onClick={() => history.push("/home")}
              >
                Cancel
                <i className='material-icons right'>cancel</i>
              </button>
            </div>
            <div className='col '>
              <button
                className='btn waves-effect waves-light green darken-4 myBtn'
                style={{ marginTop: "2em" }}
                type='submit'
                name='action'
              >
                Save
                <i className='material-icons right'>send</i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateCharacter
