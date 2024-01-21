import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UserProfile from "../UserProfile/User"
const Navbar = (props) => {
  const { user ,dispatch,isAdmin} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLoginClick = () => {
   
      navigate("/login");
    
  };

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
          border:"1px solid green",borderRadius:"10px",boxShadow:"rgba(0, 0, 0, 0.1) -5px 3px 0px"}}/>
        </Link>
        
          {user?<UserProfile user={user} logout={logout} isAdmin={isAdmin}/>:(<div className="navItems">
            <button onClick={handleSignClick} className="navButton">Register</button>
            <button onClick={handleLoginClick} className="navButton">Login</button>
          </div>)}
      </div>
    </div> 
    </>
  );
};

export default Navbar;
