import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const characters = useSelector((state) => state.characters.characters)

  useEffect(() => {
    const results = characters.filter((character) =>
      searchTerm !== ""
        ? character.name.toLowerCase().includes(searchTerm)
        : false
    )
    setSearchResults(results)
  }, [searchTerm])
  console.log(searchResults)

  return (
    <nav style={{ marginTop: "30px" }} className='brown lighten-5 container'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete='off'
              placeholder='Search character'
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
            {searchResults.length < 1 ? null : (
              <ul className='collection'>
                {searchResults.map((item, i) => (
                  <li
                    key={i}
                    className='collection-item'
                    style={{ color: "black" }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </div>
    </nav>
  )
}

export default SearchBar
