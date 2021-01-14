import React, { useCallback, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addCharacter } from "../../actions/characterActions"
import M from "materialize-css/dist/js/materialize.min.js"
import axios from "axios"
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
  const [alignment, setAlignment] = useState("0")
  const [activeSpell, setActiveSpell] = useState(null)
  // Reffiä ei voi käyttää useEffectissä, koska se ei re-renderöi
  const collapsibleRef = useCallback((elem) => {
    M.Collapsible.init(elem, {
      inDuration: 3000,
      onOpenStart: async (elem) => {
        console.log(elem.id)
        try {
          const res = await axios.get(
            "http://localhost:5000/api/spells/" + elem.id
          )
          setActiveSpell(res.data)
        } catch (e) {
          console.log(e)
          setActiveSpell(null)
        }
      },
    })
    // console.log(elem)
  })

  let instance = null

  const modalRef = useCallback((elem) => {
    instance = M.Modal.init(elem, {
      inDuration: 0,
      outDuration: 0,
    })
    activeSpell && instance && instance.open()
    // i.open()
  })

  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('.modal');
  //   var instances = M.Modal.init(elems, options);
  // });

  const getClass = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/classes`)
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
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  // Hateaan spellit vasta kun valitaan joku classi
  useEffect(() => {
    getClass()
    // getSpell()
  }, [])

  useEffect(() => {
    // getClass()
    getSpell()
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
                onChange={(e) => setCharacterClass(e.target.value)}
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
          {/* <!-- Modal Trigger --> */}
          <a
            className='waves-effect waves-light btn'
            onClick={() => instance.open()}
            // href='#modal1'
          >
            {/* {characterSpells & characterSpells.count} */}
            Spells ({characterSpells ? characterSpells.count : 0})
          </a>

          {/* <!-- Modal Structure --> */}
          <div id='modal1' className='modal modal-fixed-footer' ref={modalRef}>
            <div className='modal-content'>
              {/* <h4>{c.index}</h4> */}
              <ul className='collapsible' ref={collapsibleRef}>
                {characterSpells &&
                  characterSpells.results.map((c, i) => (
                    <li key={i} value={c.index} id={c.index}>
                      <div className='collapsible-header'>
                        <i className='material-icons'>filter_drama</i>
                        {c.name}
                      </div>
                      <div className='collapsible-body'>
                        <span>
                          {activeSpell ? activeSpell.desc : "No data found"}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className='modal-footer'>
              <a
                href='#!'
                className='modal-close waves-effect waves-green btn-flat'
              >
                Accept
              </a>
            </div>
          </div>
          {/* {characterClasses.results.map((c, i) => (
                  <option key={i} value={c.index}>
                    {c.name}
                  </option>
                ))} */}
          {/* <ul className='collapsible' ref={collapsibleRef}>
            {characterClasses.results.map((c, i) => (
              <li key={i} value={c.index}>
                <div className='collapsible-header'>
                  <i className='material-icons'>filter_drama</i>
                  {c.name}
                </div>
                <div className='collapsible-body'>
                  <span>Lorem ipsum dolor sit amet.</span>
                </div>
              </li>
            ))} */}
          {/* <li>
              <div className='collapsible-header'>
                <i className='material-icons'>filter_drama</i>First
              </div>
              <div className='collapsible-body'>
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
            </li> */}
          {/* <li>
              <div className='collapsible-header'>
                <i className='material-icons'>place</i>Second
              </div>
              <div className='collapsible-body'>
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
            </li>
            <li>
              <div className='collapsible-header'>
                <i className='material-icons'>whatshot</i>Third
              </div>
              <div className='collapsible-body'>
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
            </li> */}
          {/* </ul> */}

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
