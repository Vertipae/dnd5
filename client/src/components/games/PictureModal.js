import React from "react"
import M from "materialize-css/dist/js/materialize.min.js"

function PictureModal({ game }) {
  return (
    <div>
      {/* <!-- Modal Trigger --> */}
      <a className='modal-trigger' href='#modal1'>
        {/* Piirtää kuvan, jos ehto täyttyy ei enään erroria gameFile.type */}
        {game.gameFile && (
          <img
            className='uploadImg'
            src={`data:${game.gameFile.type};base64,${atob(
              game.gameFile.data
            )}`}
            alt='uploaded'
          />
        )}
      </a>

      {/* <!-- Modal Structure --> */}
      <div id='modal1' className='modal'>
        <div className='modal-content'>
          {/* Piirtää kuvan, jos ehto täyttyy ei enään erroria gameFile.type */}
          {game.gameFile && (
            <img
              className='modalImg'
              src={`data:${game.gameFile.type};base64,${atob(
                game.gameFile.data
              )}`}
              alt='uploaded'
            />
          )}
        </div>
        <div className='modal-footer'>
          <a
            href='#!'
            className='modal-close waves-effect waves-green btn-flat'
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  )
}

export default PictureModal
