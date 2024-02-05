import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./RoomPanel.css"
import SearchPanel from '../SearchPanel';
import Modal from "../../../components/UpdateModal/Modal"

import "./RoomPanel.css"
const RoomPanel = () => {

    const [data,setData]=useState([])
    const [preserve,setpreserve]=useState([])
    const [OpenModal,setIsDeleteOpen]=useState({
        isopen:false,
        cred:{
            id:0,
            hotelId:0
        }
    })
    const [message,setmessage]=useState("")

    const [loading,setloading]=useState(false)
    
    
    const fetchData=async()=>{
        setloading(true)
        try{
            const res=await axios.get("/rooms/")
            setloading(false)
            setData(res.data)
            setpreserve(res.data)
        }catch(err){
            setloading(false)
        }
    }

    const processDone=()=>{
        setmessage("")
        setIsDeleteOpen({isopen:false,
            cred:{
                id:0,
                hotelId:0
            }})
    }

    const handleSubmit=async({id,hotelId})=>{
        setloading(true)
        try{
            const res=await axios.delete(`/rooms/${id}/${hotelId}`)
            setloading(false)
            console.log("ooo this is data",res)
            setmessage(res.data)
            fetchData()
        }catch(err){
            setloading(false)
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])

  return <>
    <SearchPanel searchquery={{s1:"Room",s2:"Hotel"}}fetchAgain={fetchData} Data={data} onsearch={(value)=>setData(value)} preserved={preserve}/>
    <div className='bookingData'>
  {data.length > 0 && (
    <table className="bookingtable">
      <tr>
        <th>Contact</th>
        <th>Hotel</th>
        <th>RoomId</th>
        <th>City</th>
        <th>Address</th>
        <th>Charge/Day</th>
        <th>Delete</th>
      </tr>
      {data.map((item) => (
        <tr key={item._id}>
          <td>{item.contact}</td>
          <td>{item.hotel}</td>
          <td>{item.RoomId}</td>
          <td>{item.city}</td>
          <td>{item.address}</td>
          <td>{item.price}&#8377;</td>
          <td>
            <button className="blow-up-button" onClick={() => setIsDeleteOpen({ isopen: true, cred:{id:item._id,hotelId:item.hotelId}})}>
              <div className="icon">&#128065;</div>
            </button>
          </td>
        </tr>
      ))}
    </table>
  )}
</div>


        {loading&&!OpenModal.isopen&&<Modal>
            <h3 style={{textAlign:"center"}}>Fetching Room Details...</h3>
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
            <h3>Are you Sure want to delete?</h3>
        <div className="actions">
            <button onClick={()=>setIsDeleteOpen({isopen:false,id:0})} className="submit">Cancel</button>
            <button onClick={()=>handleSubmit(OpenModal.cred)} className="submit">Ok</button>
        </div>
            </div>
            </Modal>}

  </>
}

export default RoomPanel
