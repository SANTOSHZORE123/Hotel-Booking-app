import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import "./Admin.css"
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { FaBars, FaTimes } from 'react-icons/fa';
import UserPanel from './UserPanel'
import HotelPanel from './HotelPanel'
import RoomPanel from './RoomPanel/RoomPanel'
import StatsPanel from './StatsPanel/StatsPanel'
import Welcome from './Welcome'
// {
//   "username":"Manager",
//   "password":"Admin@123",
//   "isAdmin":"YES",
//   "email":"Admin@gmail.com",
//   "phone":"5892537610",
//   "country":"india",
//   "city":"pune"

// }
const Admin = () => {
  const { user, isAdmin } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [clickContext,setclickContext]=useState("welcome");
  const toggleNavbar = () => {
    console.log("clicked")
    setIsNavbarVisible(!isNavbarVisible);
  };

  const HandleClick = (e) => {
    console.log(e.currentTarget.getAttribute("value"))
    setclickContext(e.currentTarget.getAttribute("value"))
  }
  useEffect(() => {
    if (isAdmin === false) {
      navigate("/")
    }
  }, [isAdmin])

  return (
    <>
      <Navbar panel={"AdminOn"} />


      <div className='maindiv'>

        <div className='left'>
          <div className="navbar-toggle-icon" style={isNavbarVisible ? { width: "165px", backgroundColor: "#44447b", display: "flex", justifyContent: "end", padding: "5px 5px 0px 0px" } : {}}>
            {isNavbarVisible ? <FaTimes size={25} onClick={toggleNavbar} style={{ cursor: "pointer" }} /> : <FaBars size={30} onClick={toggleNavbar} style={{ cursor: "pointer" }} />}
          </div>
          <div className='main_admin' style={{ display: isNavbarVisible ? 'flex' : 'none' }}>
            <img className="ima" src="/Profile.jpg" alt="" value="welcome" onClick={HandleClick}/>
            <p style={{textAlign:"center"}}>Welcome, {user}!</p>
            <h4 style={{ marginTop: "15px" }}>Admin Panel</h4>
            <div className='admin-container'>
              <div onClick={(e)=>HandleClick(e)} value="User">
                <img src="/photo.jpg" className='ima' /><h5 onClick={HandleClick}>User Profiles</h5><br />
              </div>
              <div onClick={(e)=>HandleClick(e)} value="Hotel">
                <img src="/Profile.jpg" className='ima' /><h5>Hotel Management</h5><br />
              </div>
              <div onClick={(e)=>HandleClick(e)} value="Room">
                <img src="/Profile.jpg" className='ima' /><h5>Rooms Management</h5><br />
              </div>
              <div onClick={(e)=>HandleClick(e)} value="Reservations">
                <img src="/Profile.jpg" className='ima' /><h5>Reservation Stats</h5><br />
              </div>
            </div>

          </div>
        </div>




        <div className='right'>
        {clickContext==="welcome"&&<Welcome/>}
        {clickContext==="User"&&<UserPanel/>}
        {clickContext==="Hotel"&&<HotelPanel/>}
        {clickContext==="Room"&&<RoomPanel/>}
        {clickContext==="Reservations"&&<StatsPanel/>}
        </div>
      </div>
    </>
  )
}

export default Admin
