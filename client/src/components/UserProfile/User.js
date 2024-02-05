import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import "./User.css"
const User = (props) => {

  const navigate = useNavigate();

  const [isModalOpen,setIsModalOpen]=useState(false)

  const logoutHanlder=()=>{
      props.logout()
  }

  const AdminPanel=()=>{
    navigate("/adminpanel")
  }

  return <>
  {!props.panel&&<div className='main_profile'>
      <img className='image' src="/Profile.jpg" onClick={()=>{setIsModalOpen((prev)=>!prev)}}/>

      {/* <span> {isAdmin&&<button onClick={AdminPanel}>Admin Panel</button>}<button onClick={logoutHanlder}>Logout</button> </span> */}
    {isModalOpen&&<Profile BOOKING={props.BOOKING}AdminPanel={AdminPanel} ModalOpen={setIsModalOpen} logoutHanlder={logoutHanlder}{...props}/>}
    </div>}
  </>
    
  
}

export default User;
