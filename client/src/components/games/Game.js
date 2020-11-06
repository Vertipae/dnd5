import React from "react"
import { useSelector } from "react-redux"

const Game = ({ match }) => {
  const game = useSelector(
    (state) =>
      state.games.games.filter((game) => game._id === match.params.id)[0]
  )

  if (!game) {
    return <div></div>
  }
  return (
    <div>
      <p>
        Game {game.name}
        {/* {game.player} */}
      </p>
    </div>
  )
}
export default Game
