import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteCharacter,
  updateCharacter,
} from "../../actions/characterActions"
import axios from "axios"

const Character = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [character, setCharacter] = useState(
    useSelector(
      (state) =>
        state.characters.characters.filter(
          (character) => character._id === match.params.id
        )[0]
    )
  )

  const [characterClasses, setCharacterClasses] = useState(null)

  const getClass = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/classes`)
      setCharacterClasses(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getClass()
  }, [])

  // console.log(characterClass)
  // console.log(character)
  if (!characterClasses) {
    return <div></div>
  }

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(updateCharacter(character, history))
  }

  if (!character) {
    return <div></div>
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='container'>
          <div className='row'>
            <div className='col s6'>
              <div className='input-field col s4'>
                <input
                  id='characterName'
                  type='text'
                  value={character.name}
                  onChange={(e) =>
                    setCharacter({ ...character, name: e.target.value })
                  }
                />
                <label className='active'>CHARACTER NAME:</label>
              </div>
              <div className='input-field col s4'>
                <input
                  id='level'
                  type='text'
                  value={character.level}
                  onChange={(e) =>
                    setCharacter({ ...character, level: e.target.value })
                  }
                />
                <label className='active'>LEVEL:</label>
              </div>
            </div>
          </div>

          <div className='col s12 row'>
            <div className='col s4'>
              <label>Race Select</label>
              <select
                className='browser-default'
                value={character.race}
                onChange={(e) =>
                  setCharacter({ ...character, race: e.target.value })
                }
              >
                {/* <option value={characterRace} disabled>
                Races
              </option> */}
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
                value={character.characterClass}
                onChange={(e) =>
                  setCharacter({ ...character, characterClass: e.target.value })
                }
              >
                {characterClasses.results.map((c, i) => (
                  <option key={i} value={c.index}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='col s4'>
              <label>Alignment Select</label>
              <select
                className='browser-default'
                value={character.alignment}
                onChange={(e) =>
                  setCharacter({ ...character, alignment: e.target.value })
                }
              >
                {/* <option value={characterAlignment} disabled>
                Alignments
              </option> */}
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
                className='btn waves-effect waves-light red darken-4 myBtn'
                style={{ marginTop: "2em" }}
                type='submit'
                name='action'
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(deleteCharacter(character._id, history))
                }}
              >
                Delete
                <i className='material-icons right'>delete</i>
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
      {/* <button onClick={(e) => dispatch(deleteCharacter(character._id))}>TestDeletebutton</button> */}
    </div>
  )
}

export default Character
