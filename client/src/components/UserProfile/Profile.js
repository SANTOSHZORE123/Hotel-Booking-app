import React from 'react'
import { Link } from 'react-router-dom'
import "./Profile.css"
const Profile = (props) => {
  return (
    <div className='Profile'>
      <h3>{props.user}!</h3>
      {!props.BOOKING&&<Link to={`/MyBookings`} onClick={()=>props.ModalOpen((prev)=>!prev)}><h3>MyBookings</h3></Link>}
      {props.isAdmin&&<button onClick={props.AdminPanel}>Admin Panel</button>}
      <button onClick={props.logoutHanlder}>Logout</button>
    </div>
  )
}

export default Profile
