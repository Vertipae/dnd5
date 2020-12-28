import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addGame } from "../../actions/gameActions"

export default function CreateGame() {
  const errors = useSelector((state) => state.errors)
  const games = useSelector((state) => state.games.games)
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState({ type: "", data: "" })
  // const gameFile = useRef()

  const onChange = (e) => {
    console.log(e.target.name)
    switch (e.target.name) {
      case "name":
        setName(e.target.value)
        break
      case "description":
        setDescription(e.target.value)
        break
      case "image":
        console.log(e.target)
        if (!e.target || !e.target.files || e.target.files.length === 0) return
        const file = e.target.files[0]
        console.log(file)
        if (file) {
          console.log("lolo")
          const reader = new FileReader()
          reader.onload = (e) => {
            console.log(e)
            setFile({ type: file.type, data: btoa(e.target.result) })
          }

          reader.readAsBinaryString(file)
        }
        break
      default:
        break
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()
    // console.log(gameFile.current.files[0])

    const newGame = {
      name,
      description,
      gameFile: JSON.stringify(file),
      // gameFile: JSON.stringify(gameFile.current.files[0]),
    }
    // console.log(newGame)
    dispatch(addGame(newGame, history, null))
  }

  useEffect(() => {
    console.log(file)
  }, [file])
  return (
    <div className='container'>
      <form
        onSubmit={onSubmit}
        encType='multipart/form-data'
        onChange={onChange}
      >
        <div className='row'>
          <div className='input-field col s8'>
            <i className='material-icons prefix'>people</i>
            <input
              id='icon_prefix'
              type='text'
              name='name'
              className={errors.name ? "invalid" : ""}
              value={name}
              // onChange={(e) => setName(e.target.value)}
            />
            <label className={name !== "" ? "active" : ""}>Game Name</label>
          </div>
          <div className='file-field input-field col s4 right'>
            <div className='btn'>
              <span>File</span>
              <input
                type='file'
                // ref={gameFile}
                id='image'
                name='image'
              />
            </div>
            <div className='file-path-wrapper'>
              <input className='file-path validate' type='text' />
            </div>
          </div>
        </div>
        {/* <div className='row'> */}
        {/* <form className='col s12'> */}
        {/* <div className='row'> */}
        <div className='input-field col s12'>
          <i className='material-icons prefix'>description</i>
          <textarea
            id='icon_prefix2'
            className='materialize-textarea'
            value={description}
            name='description'
            // onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label>Game description</label>
        </div>
        {/* </div> */}
        {/* </form> */}
        {/* </div> */}

        <button
          className='btn waves-effect waves-light green darken-3 myBtn'
          style={{ marginTop: "2em" }}
          type='submit'
          name='action'
        >
          Save
          <i className='material-icons right'>send</i>
        </button>
      </form>
    </div>
  )
}
