import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./signup.css";
import Navbar from "../../components/navbar/Navbar";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    isAdmin: undefined,
    email:undefined,
    phone:undefined,
    country:undefined,
    city:undefined
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
      console.log(e.target.value,e.target.id)
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try{
      const res = await axios.post("/auth/register", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/login")
    } catch (err) {
        console.log(err)
      dispatch({ type: "LOGIN_FAILURE", payload: "Something Went Wrong" });

      setTimeout(()=>{
        dispatch({ type: "LOGIN_FAILURE", payload: null });
      },1000)
    }
    
  };


  return (<>
  <Navbar/>
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="number"
          placeholder="phone"
          id="phone"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="country"
          id="country"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="city"
          id="city"
          onChange={handleChange}
          className="lInput"
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        
        <button disabled={loading} onClick={handleClick} className="lButton">
          Signup
        </button>
        {error && <span>{error.message || "Something Went Wrong"}</span>}
      </div>
    </div>
    </>
  );
};

export default SignUp;
