import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./UserPanel.css"
import SearchPanel from './SearchPanel';
import Modal from "../../components/UpdateModal/Modal"
import Slider from '../../components/ImgSlider';

import "./HotelPanel.css"
import UpdateHotel from './updates/UpdateHotel';
const HotelPanel = () => {

    const [data,setData]=useState([])
    const [preserve,setpreserve]=useState([])
    const [OpenModal,setIsDeleteOpen]=useState({
        isopen:false,
        id:0
    })
    const [message,setmessage]=useState("")
    const [update,setupdate]=useState({isopen:false,value:0,photo:[]})
    const [view,setView]=useState(false)

    const [loading,setloading]=useState(false)
    
    
    const fetchData=async()=>{
        console.log("user click something")
        setloading(true)
        try{
            const res=await axios.get("/hotels/")
            setloading(false)
            setData(res.data)
            setpreserve(res.data)
            console.log("hii",res.data)
        }catch(err){
            setloading(false)
        }
    }

    const processDone=()=>{
        setmessage("")
        setIsDeleteOpen({isopen:false,id:0})
    }

    const handleSubmit=async(id)=>{
      console.log(id, "this is one")
        setloading(true)
        try{
            const res=await axios.delete(`/hotels/${id}`)
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
    <SearchPanel searchquery={{s1:"Hotel",s2:"City"}} fetchAgain={fetchData} Data={data} onsearch={(value)=>setData(value)} preserved={preserve}/>
    <div className='bookingData'>
  {data.length > 0 && (
    <table className="bookingtable">
      <tr>
        <th>Contact</th>
        <th>Hotel</th>
        <th>City</th>
        <th>Adderss</th>
        <th>Distance</th>
        <th>Charge/Day</th>
        <th>View Photos</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
      {data.map((item) => (
        <tr key={item._id}>
          <td>{item.contact}</td>
          <td>{item.name}</td>
          <td>{item.city}</td>
          <td>{item.address}</td>
          <td>{item.distance}</td>
          <td>{item.chepestPrice}&#8377;</td>
          <td>
            <button onClick={() => setView(true)}>
              view
            </button>
          </td>
          <td>
            <button onClick={() => setupdate({isopen:true,value:item._id,photo:item.photos})}>
              update
            </button>
          </td>
          <td>
            <button className="blow-up-button" onClick={() => setIsDeleteOpen({ isopen: true, id: item._id })}>
            </button>
          </td>
          {view&&<Modal onClose={()=>setView(false)}>
            <Slider photos={item.photos}/>
            <div className="actions">
                <button onClick={()=>setView(false)} className="submit">Ok</button>
            </div>
            </Modal>}
        </tr>
      ))}
    </table>
  )}
</div>


          {update.isopen&&<Modal onClose={()=>setupdate({isopen:false,value:0,photo:[]})}>
                <UpdateHotel updatemessage={(message)=>setmessage(message)} hotelId={update.value} photos={update.photo} onClose={()=>setupdate({isopen:false,value:0,photo:[]})} fetchAgain={fetchData}/>
            </Modal>}
        {loading&&!OpenModal.isopen&&<Modal>
            <h3 style={{textAlign:"center"}}>Fetching Hotel Details...</h3>
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
            <button onClick={()=>handleSubmit(OpenModal.id)} className="submit">Ok</button>
        </div>
            </div>
            </Modal>}

  </>
}

export default HotelPanel
