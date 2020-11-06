import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Characters = () => {
  const characters = useSelector((state) => state.characters.characters)

  console.log(characters)

  return (
    <div>
      <ul className='collection with-header'>
        <li className='collection-header brown lighten-5'>
          <h5>Characters</h5>
        </li>
        {characters.map((character, i) => (
          <Link key={character._id} to={`character/${character._id}`}>
            <li
              className='collection-item'
              style={{
                fontSize: "1.1em",
                marginTop: "0.5em",
                backgroundColor: i % 2 !== 0 ? "#efebe9" : "",
              }}
            >
              {character.name}, {character.race} {character.characterClass}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Characters
