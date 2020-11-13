import React from "react"
import { useSelector } from "react-redux"

export default function WelcomeBar() {
  const player = useSelector((state) => state.auth.player)
  // console.log(player)

  if (!player) {
    return <div></div>
  }
  return (
    <div className='container' style={{ marginBottom: "1.5em" }}>
      <h5 className='welcomeText'>
        Welcome,{"  "}{" "}
        <span className='playerWelcomeName'>
          {player.username}
          {"  "}{" "}
        </span>
        <span style={{ fontSize: "25px", color: "Mediumslateblue" }}>
          <i className='fas fa-hat-wizard'></i>
        </span>
        <br></br>Are you ready to start your adventure?{"  "}
        {"  "}
      </h5>
    </div>
  )
}
