import React from 'react'

export default function Settings() {
    return ( 
 <div className="container">
    <h5>Dark mode</h5>
    <div className="switch">
    <label>
      Off
      <input type="checkbox"/>
      <span className="lever"></span>
      On
    </label>
  </div>
</div>
    )
}
