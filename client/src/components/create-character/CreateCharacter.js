import React, { useEffect } from "react"
// Todo: Subrace(Dwarf => Hill Dwarf) & languages, experience points, background

const CreateCharacter = () => {
  return (
    <form>
      <div className="container">
        <div className="row">
          {/* <div className='divider' /> */}
          <div className="col s6">
            <div className="input-field col s4">
              <input id="characterName" type="text" />
              <label>CHARACTER NAME:</label>
            </div>
            <div className="input-field col s4">
              <input id="level" type="text" />
              <label>LEVEL:</label>
            </div>
          </div>

          <div className="col s12 row">
            <div className="col s4">
              <label>Race Select</label>
              <select className="browser-default" defaultValue="0">
                <option value="0" disabled>
                  Races
                </option>
                <option value="1">Aasimar</option>
                <option value="2">Dragonborn</option>
                <option value="3">Dwarf</option>
                <option value="4">Elf</option>
                <option value="5">Gnome</option>
                <option value="6">Half-Elf</option>
                <option value="7">Half-Orc</option>
                <option value="8">Halfling</option>
                <option value="9">Human</option>
                <option value="10">Tiefling</option>
              </select>
            </div>

            <div className="col s4">
              <label>Class Select</label>
              <select className="browser-default" defaultValue="0">
                <option value="0" disabled>
                  Classes
                </option>
                <option value="1">Bard</option>
                <option value="2">Cleric</option>
                <option value="3">Druid</option>
                <option value="4">Other</option>
                <option value="5">Paladin</option>
                <option value="6">Ranger</option>
                <option value="7">Sorcerer</option>
                <option value="8">Warlock</option>
                <option value="9">Wizard</option>
              </select>
            </div>

            <div className="col s4">
              <label>Alignment Select</label>
              <select className="browser-default" defaultValue="0">
                <option value="0" disabled>
                  Alignments
                </option>
                <option value="1">Lawful good</option>
                <option value="2">Lawful neutral</option>
                <option value="3">Lawful evil</option>
                <option value="4">Neutral good</option>
                <option value="5">Neutral</option>
                <option value="6">Neutral evil</option>
                <option value="7">Chaotic good</option>
                <option value="8">Chaotic neutral</option>
                <option value="9">Chaotic evil</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CreateCharacter
