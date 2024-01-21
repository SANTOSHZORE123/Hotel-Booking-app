import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./User.css"
const User = ({user,logout,isAdmin}) => {
  const navigate = useNavigate();

  const logoutHanlder=()=>{
      logout()
  }

  const AdminPanel=()=>{
    navigate("/adminpanel")
  }

  return (
    <div className='main_profile'>
      <img className='image' src="/photo.jpg"/>

      <div>{user}</div>

      <span> {isAdmin&&<button onClick={AdminPanel}>Admin Panel</button>}<button onClick={logoutHanlder}>Logout</button> </span>
    </div>
  )
}

export default User;
