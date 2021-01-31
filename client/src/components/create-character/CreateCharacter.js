import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addCharacter } from "../../actions/characterActions"
import M from "materialize-css/dist/js/materialize.min.js"
import BASE_URL from "../../utils/baseurl"
import axios from "axios"
// import Spinner from "../common/Spinner"
import SpellsModal from "./SpellsModal"

// Todo: Subrace(Dwarf => Hill Dwarf) & languages, experience points, background

const CreateCharacter = () => {
  // const characters = useSelector((state) => state.characters)
  const errors = useSelector((state) => state.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState("")
  const [race, setRace] = useState("0")
  const [characterClass, setCharacterClass] = useState("")
  // Cannot read property 'map' of undefined. Ylhäältä alas, koska characterClasses.result ei ole vielä olemassa ni tyhjä divi
  const [characterClasses, setCharacterClasses] = useState(null)
  const [characterSpells, setCharacterSpells] = useState(null)
  const [level, setLevel] = useState("")
  const [spells, setSpells] = useState([])
  const [alignment, setAlignment] = useState("0")
  // const [activeSpell, setActiveSpell] = useState(null)

  const getClass = async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/classes`)
      setCharacterClasses(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const getSpell = async () => {
    if (characterClass === "") return
    try {
      const response = await axios.get(
        `http://localhost:5000/api/classes/${characterClass}/spells`
      )
      setCharacterSpells(response.data)
      // console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit()
  })
  // Hateaan spellit vasta kun valitaan joku classi
  useEffect(() => {
    getClass()
    // getSpell()
  }, [])

  useEffect(() => {
    // console.log(spells)
  }, [spells])
  useEffect(() => {
    // getClass()
    getSpell()
    setSpells([])
  }, [characterClass])
  // console.log(characterClass)
  // console.log(characterSpells)

  const onSubmit = (e) => {
    e.preventDefault()

    const newCharacter = {
      name,
      race,
      characterClass,
      level,
      alignment,
      spells,
      // errors: {},
    }

    dispatch(addCharacter(newCharacter, history))
  }
  // || characterClasses.length === 0)
  if (!characterClasses) {
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
                onChange={(e) => {
                  setCharacterClass(e.target.value)
                }}
              >
                <option value='' disabled>
                  Classes
                </option>
                {characterClasses.results.map((c, i) => (
                  <option key={i} value={c.index}>
                    {c.name}
                  </option>
                ))}
                {/* <option value='Bard'>Bard</option>
                <option value='Cleric'>Cleric</option>
                <option value='Druid'>Druid</option>
                <option value='Other'>Other</option>
                <option value='Paladin'>Paladin</option>
                <option value='Ranger'>Ranger</option>
                <option value='Sorcerer'>Sorcerer</option>
                <option value='Warlock'>Warlock</option>
                <option value='Wizard'>Wizard</option> */}
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
          <SpellsModal
            characterSpells={characterSpells}
            setParentSpells={setSpells}
            parentSpells={spells}
          />

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
