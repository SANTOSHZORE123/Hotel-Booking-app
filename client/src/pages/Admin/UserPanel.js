import React, { useContext, useEffect, useState } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from "axios"
import "./UserPanel.css"
import Modal from "../../components/UpdateModal/Modal"
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const UserPanel = () => {
    const {authusername,dispatch,isAdmin} = useContext(AuthContext);
    const [data,setData]=useState([])
    const navigate=useNavigate()
    const [OpenModal,setIsDeleteOpen]=useState({
        isopen:false,
        id:0,
        username:0
    })
    const [message,setmessage]=useState("")

    const [loading,setloading]=useState(false)
    
    
    const fetchData=async()=>{
        console.log("user click something")
        setloading(true)
        try{
            const res=await axios.get("/users/")
            setloading(false)
            setData(res.data)
            console.log(res.data)
        }catch(err){
            setloading(false)
        }
    }

    const processDone=()=>{
        setmessage("")
        setIsDeleteOpen({isopen:false,id:0,username:0})
    }

    const handleSubmit=async(id,user)=>{
      console.log("this is actual names",user,authusername)
        setloading(true)
        try{
            const res=await axios.delete(`/users/${id}`)
            if(user===authusername){
              dispatch({type:"LOGOUT"})
            }
            setloading(false)
            setmessage(res.data.message)
            fetchData()
        }catch(err){
            setloading(false)
            setmessage(err.data.message)
        }
    }

    const formatDate=(inputDate)=>{

        // Create a Date object from the input string
        const date = new Date(inputDate);

        // Extract day, month, and year
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
        const year = date.getUTCFullYear();

        // Create the Indian date format string: "dd-mm-yyyy"
        const indianDateFormat = `${day}-${month}-${year}`;
        return indianDateFormat
    }

    useEffect(()=>{
        fetchData()
    },[])


    const clickHandler=(id,username)=>{
      setIsDeleteOpen({ isopen: true, id: id,username:username })
      console.log(id,username);
    }

  return <>
    {data.length===0?<h2 className='title'>No one Yet Registered!</h2>:<h2 className='title'>Here are Registered users on this portal</h2>}
    <div className='bookingData'>
  {data.length > 0 && (
    <table className="bookingtable">
      <tr>
        <th>Date Created</th>
        <th>Username</th>
        <th>Email ID</th>
        <th>Total Bookings</th>
        <th>City</th>
        <th>Contact No.</th>
        <th>Admin</th>
        <th>Delete</th>
      </tr>
      {data.map((item) => (
        <tr key={item._doc._id}>
          <td>{formatDate(item._doc.createdAt)}</td>
          <td>{item._doc.username}</td>
          <td>{item._doc.email}</td>
          <td>{item._doc.totalRegistrations}</td>
          <td>{item._doc.city}</td>
          <td>{item._doc.phone}</td>
          <td>
            {item._doc.isAdmin ==="YES"||item._doc.isAdmin ==="Yes"? (
              <FaCheckCircle size={20}className="admin-icon" />
            ) : (
              <FaTimesCircle size={20} className="non-admin-icon" />
            )}
          </td>
          <td>
            <button className="blow-up-button" onClick={()=>clickHandler(item._doc._id,item._doc.username)}>
              <div className="icon">&#128065;</div>
            </button>
          </td>
        </tr>
      ))}
    </table>
  )}
</div>



        {loading&&!OpenModal.isopen&&<Modal>
            <h3 style={{textAlign:"center"}}>Fetching User Details...</h3>
            </Modal>}
        {OpenModal.isopen&&loading&&<Modal>
            <h3 style={{textAlign:"center"}}>Processing Your Request...</h3>
            </Modal>}

        {OpenModal.isopen&&message.length>0&&<Modal>
            <div><h3 style={{textAlign:"center"}}>{message}</h3>
            <div className="actions">

            <button onClick={processDone} className='submit'>Ok</button>
            </div>
            </div>
            </Modal>}

        {OpenModal.isopen&&message.length===0&&!loading&&<Modal>
            <div>
            <h3>Are You want to delete?</h3>
        <div className="actions">
            <button onClick={()=>setIsDeleteOpen({isopen:false,id:0})} className="submit">Cancel</button>
            <button onClick={()=>handleSubmit(OpenModal.id,OpenModal.username)} className="submit">Ok</button>
        </div>
            </div>
            </Modal>}

  </>
}

export default UserPanel
