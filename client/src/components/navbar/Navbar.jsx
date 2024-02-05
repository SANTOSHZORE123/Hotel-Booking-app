import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UserProfile from "../UserProfile/User"
const Navbar = (props) => {
  const { user ,dispatch,isAdmin} = useContext(AuthContext);
  console.log(user)
  const navigate = useNavigate();
  const handleLoginClick = () => {
   
      navigate("/login");
    
  };

 const statHandler=()=>{
  navigate("/Stats")
 }

  const logout=()=>{
    dispatch({type:"LOGOUT"})
  }


  const handleSignClick=()=>{
      navigate("/signup")
  }
  return (
    <>
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color: "inherit", textDecoration: "none"}} >
          <img src="/hotel.jpg" style={{width:"110px",height:"70px",backgroundColor:"green",
          border:"1px solid black",borderRadius:"10px",boxShadow:"rgba(0, 0, 0, 0.1) -5px 3px 0px"}}/>
        </Link>
              <div className="headerListItem active" onClick={()=>statHandler()}>
              <FontAwesomeIcon icon={faBed} />
                <span>Stats</span>
              </div>
              <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />
                <span>Flights</span>
              </div>
              <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />
                <span>Car rentals</span>
              </div>
              <div className="headerListItem">
                <FontAwesomeIcon icon={faBed} />
                <span>Attractions</span>
              </div>
              <div className="headerListItem" onClick={()=>statHandler()}>
                <FontAwesomeIcon icon={faTaxi} />
                <span>Taxi</span>
              </div>
        
          {user?<UserProfile user={user} {...props} logout={logout} isAdmin={isAdmin}/>:(<div className="navItems">
            <button onClick={handleSignClick} className="navButton">Register</button>
            <button onClick={handleLoginClick} className="navButton">Login</button>
          </div>)}
      </div>
    </div> 
    </>
  );
};

export default Navbar;
