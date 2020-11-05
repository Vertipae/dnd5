import React from "react"
import { useSelector } from "react-redux"

export default function WelcomeBar() {
  const auth = useSelector((state) => state.auth.player)
  // console.log(auth)

  if (!auth) {
    return <div></div>
  }
  return (
    <div className='container' style={{ marginBottom: "1.5em" }}>
      <h5>
        Welcome,{"  "}
        <span style={{ color: "Highlight", textTransform: "capitalize" }}>
          {auth.player.username}
        </span>
        . {"  "}Are you ready to start your adventure?{"  "}
        <span style={{ fontSize: "40px", color: "Mediumslateblue" }}>
          <i className='fas fa-hat-wizard'></i>
        </span>
        {"  "}
      </h5>
    </div>
  )
}
