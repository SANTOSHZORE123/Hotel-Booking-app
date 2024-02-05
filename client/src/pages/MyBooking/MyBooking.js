import axios from "axios";
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import UserRegistration from "../../components/Registration/UserRegistration";
import "./MyBooking.css"
import Modal from "../../components/UpdateModal/Modal";
const MyBooking = () => {
  console.log("hii")
  const {user}=useContext(AuthContext)
  const [loading,setlodaing]=useState(false)

  console.log(user,"hii")
  const [data,setData]=useState([])


  const fetchData = async () => {
    setlodaing(true)
    console.log("i have been called")
    try {
      const res = await axios.post("/registrations", { user });
      console.log(res.data)
      setlodaing(false)
      setData(res.data);
    } catch (err) {
      setlodaing(false)
      console.log(err);
    }
  };
  useEffect(() => {
  
    fetchData();
  
    return () => {
      // Cleanup function
      // For example, cancel any ongoing asynchronous operations
    };
  }, []); // Empty dependency array means this effect runs once after the initial render
  let index=0;


  console.log("this is new data",data)
  return <>
     <Navbar BOOKING="TRUE"/>
     <div className='Mybook'>
      <div className='titlecontainer'>
        <h2>Welcome Again {user}!</h2>
        <p style={{fontFamily:"sans-serif"}}>Please Review Your Previous Bookings</p>
      </div>
      <div className='bookingData'>
        {data.length>0&&<table className="bookingtable">
        <tr>
          <th>RG.No</th>
          <th>Hotel</th>
          <th>Room Type/ID</th>
          <th>Stay Period</th>
          <th>Payment(RS.)</th>
          <th>Location</th>
          <th>Update</th>
          <th>Delete</th>
          <th>Download Pdf</th>
        </tr>
        {data.map((item)=>{
          console.log(item._doc)
          index++;
            return <UserRegistration onDelete={fetchData} index={index}{...item._doc}/>
        })}
        </table>}
      </div>
     </div>
     {loading&&<Modal>
            <h3 style={{textAlign:"center"}}>Fetching Registration Details...</h3>
            </Modal>}
  </>
  
}

export default MyBooking
