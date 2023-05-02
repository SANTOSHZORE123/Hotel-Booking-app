import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Navbar = (props) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
   
      navigate("/login");
    
  };
  return (
    <>
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color: "inherit", textDecoration: "none"}} >
          <span className="logo">SantoshBooking</span>
        </Link>
        
          {user?user.username:(<div className="navItems">
            <button className="navButton">Register</button>
            <button onClick={handleClick} className="navButton">Login</button>
          </div>)}
      </div>
    </div>
    {props.type==="list"&&<center><b><h4>You can choose destination only between mumbai,pune or satara.type destination in lowercase letters only.</h4></b></center>}  
    </>
  );
};

export default Navbar;
