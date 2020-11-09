import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addGame } from "../../actions/gameActions"

export default function CreateGame() {
  const errors = useSelector((state) => state.errors)
  const games = useSelector((state) => state.games.games)
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    const newGame = {
      name,
    }
    dispatch(addGame(newGame, history, null))
  }
  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <div className='input-field col s6'>
          <i className='material-icons prefix'>people</i>
          <input
            id='icon_prefix'
            type='text'
            className={errors.name ? "invalid" : ""}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className={name !== "" ? "active" : ""}>Game Name</label>

          <button
            className='btn waves-effect waves-light green darken-3 myBtn'
            style={{ marginTop: "2em" }}
            type='submit'
            name='action'
          >
            Save
            <i className='material-icons right'>send</i>
          </button>
        </div>
      </form>
    </div>
  )
}
