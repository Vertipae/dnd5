import React, { useCallback, useEffect, useState } from "react"
import M from "materialize-css/dist/js/materialize.min.js"
import axios from "axios"
import Spinner from "../common/Spinner"

function SpellsModal({ characterSpells, setParentSpells, parentSpells }) {
  const [activeSpell, setActiveSpell] = useState(null)
  // Tässä komponentissa pidetään kirjaa valituista spelleistä. Acceptissa lähetetään parentcomponenttiin
  const [spells, setSpells] = useState(parentSpells)
  // Fail cleanup try
  //   useEffect(() => {
  //     return () => {
  //       setParentSpells(spells)
  //     }
  //   }, [])

  // Kun parentSpells muuttuu niin kutsumalla setSpells päivitetään spells
  useEffect(() => {
    setSpells(parentSpells)
  }, [parentSpells])

  useEffect(() => {
    console.log(spells)
  }, [spells])
  //   let instance = null

  //   const modalRef = useCallback((elem) => {
  //     instance = M.Modal.init(elem, {
  //       inDuration: 0,
  //       outDuration: 0,
  //     })
  //     activeSpell && instance && instance.open()
  //     // i.open()
  //   })

  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('.modal');
  //   var instances = M.Modal.init(elems, options);
  // });
  // Reffiä ei voi käyttää useEffectissä, koska se ei re-renderöi
  const collapsibleRef = useCallback((elem) => {
    M.Collapsible.init(elem, {
      // inDuration: 3000,
      onOpenStart: async (elem) => {
        // console.log(elem.id)

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
  return (
    <div>
      {/* <!-- Modal Trigger --> */}
      <a
        href='#spells-modal'
        className='waves-effect waves-light btn modal-trigger'

        // onClick={(e) => {
        //   instance.open()
        //   // e.stopPropagation()
        // }}
        // onChange={(e) => e.stopPropagation()}
      >
        {/* {characterSpells & characterSpells.count} */}
        Spells ({characterSpells ? characterSpells.count : 0})
      </a>

      {/* <!-- Modal Structure --> */}
      <div
        id='spells-modal'
        className='modal modal-fixed-footer'
        style={modalStyle}
      >
        <div className='modal-content'>
          {/* <h4>{c.index}</h4> */}

          <ul className='collapsible' ref={collapsibleRef}>
            {characterSpells &&
              characterSpells.results.map((c, i) => (
                <li key={i} value={c.index} id={c.index}>
                  <div className='row'>
                    <div className='col s11'>
                      <div
                        className='collapsible-header'
                        style={{ justifyContent: "space-between" }}
                        // onClick={() => console.log("headerklik")}
                      >
                        {/* <i className='material-icons'>star_border</i> */}
                        <div>{c.name}</div>
                      </div>
                    </div>
                    <div
                      className='col s1 valign-wrapper'
                      style={{ height: "53px" }}
                    >
                      <label>
                        <input
                          type='checkbox'
                          className='filled-in'
                          style={{ zIndex: 99 }}
                          //value={c.index}
                          onChange={(e) => {
                            //e.preventDefault()

                            // Checkboxin tila muuttuu on/off, jos spells-listalta
                            // löytyy tämä spelli, tiedetään että checkbox on
                            // menossa off-asentoon, joten poistetaan kyseinen spelli
                            // listalta, muussa tapauksessa lisätään
                            if (spells.includes(c.index)) {
                              setSpells(
                                spells.filter((spell) =>
                                  spell === c.index ? false : true
                                )
                              )
                            } else {
                              setSpells([...spells, c.index])
                            }
                            // console.log(spells)
                          }}
                          checked={spells.includes(c.index) ? true : false}
                          // onChange={(e) => e.stopPropagation()}
                          // onClick={(e) => {
                          //   console.log("klikcheckbox")
                          //   e.stopPropagation()
                          // }}
                        />
                        <span
                          // onClick={(e) => e.stopPropagation()}
                          className='right'
                        ></span>
                      </label>
                    </div>
                  </div>
                  <div className='collapsible-body'>
                    <span>{activeSpell ? activeSpell.desc : <Spinner />}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className='modal-footer'>
          <button
            onClick={(e) => {
              e.preventDefault()
              setParentSpells(spells)
            }}
            href='#!'
            className='modal-close waves-effect waves-green btn-flat'
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

const modalStyle = {
  width: "75%",
  height: "75%",
}

export default SpellsModal
