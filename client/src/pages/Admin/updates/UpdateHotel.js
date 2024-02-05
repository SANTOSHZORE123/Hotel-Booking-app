import React, { useState } from 'react'
import classes from "./UpdateHotel.module.css"
import axios from 'axios'
import Modal from "../../../components/UpdateModal/Modal"
const UpdateHotel = (props) => {
    console.log(props.hotelId)
    const [UpdateState,setUpdate]=useState({
        contact:"",
        name:"",
        city:"",
        address:"",
        distance:"",
        chepestPrice:""
    })
    const [message,setmessage]=useState("")
    const [loading,setloading]=useState(false)
    const [error,setError]=useState({
        message:"",
        associated:""
    })
    const changeHandler=(fieldName,e)=>{
        console.log(fieldName,e.target.value)
        setUpdate((prev)=>{
            return {
                ...prev,[fieldName]:e.target.value.toLowerCase()
            }
        })
    }

    const submitHandler=async()=>{
        if(UpdateState.contact===""||UpdateState.contact.length!==10){
            setError({message:"Phone Number must be exactly 10 digits",associated:"contact"})
            return
        }
        setError({message:"",associated:""})
        if(UpdateState.name===""){
            setError({message:"Provide Hotel Name",associated:"name"})
            return
        }
        setError({message:"",associated:""})
        if(UpdateState.address===""){
            setError({message:"address",associated:"address"})
            return
        }
        setError({message:"",associated:""})
        if(UpdateState.city===""){
            setError({message:"City name is required",associated:"city"})
            return
        }
        setError({message:"",associated:""})
        if(UpdateState.distance===""){
            setError({message:"distance must be exactly 10 digits",associated:"distance"})
            return
        }
        setError({message:"",associated:""})
        if(UpdateState.chepestPrice===""){
            setError({message:"Provide Your latest charge",associated:"chepestPrice"})
            return
        }
        setError({message:"",associated:""})
        setloading(true)
        console.log(props.hotelId,UpdateState)
        try{
             const res=await axios.put(`/hotels/${props.hotelId}`,{...UpdateState,photos:props.photos})
             console.log(res)
             setloading(false)
             setmessage(res.data.message)
             props.fetchAgain()
        }catch(error){
            setloading(false)
            setmessage(error.data.message)
            props.fetchAgain()
        }


    }

    const processfullfill=()=>{
        setmessage("")
        props.onClose()
    }

    return <>

        <h2 style={{ textAlign: "center" }}>Hotel Update Form</h2>
        <div>
            <div className={classes.control}>
                <label>
                    Phone/Mobile No:
                </label>
                <input
                    type="number" onChange={(e)=>changeHandler('contact',e)}
                    value={UpdateState.contact}
                />
                {error.associated==="contact"&&<h3 style={{color:"red"}}>{error.message}</h3>}
            </div>
            <div className={classes.control}>
                <label>
                    Hotel Name:
                </label>
                <input
                    type="text" onChange={(e)=>changeHandler('name',e)}
                    value={UpdateState.name}
                />
                {error.associated==="name"&&<h3 style={{color:"red"}}>{error.message}</h3>}
            </div>

            <div className={classes.control}>
                <label>
                    City:
                </label>
                <input
                    type="text" onChange={(e)=>changeHandler('city',e)}
                    value={UpdateState.city}
                />
                {error.associated==="city"&&<h3 style={{color:"red"}}>{error.message}</h3>}
            </div>
            <div className={classes.control}>
                <label>
                    Address:
                </label>
                <input
                    type="text" onChange={(e)=>changeHandler('address',e)}
                    value={UpdateState.address}
                />
                {error.associated==="address"&&<h3 style={{color:"red"}}>{error.message}</h3>}
            </div>
            <div className={classes.control}>
                <label>
                    Distance From City Center(km):
                </label>
                <input
                    type="number" onChange={(e)=>changeHandler('distance',e)}
                    value={UpdateState.distance}
                />
                {error.associated==="distance"&&<h3 style={{color:"red"}}>{error.message}</h3>}
            </div>
            <div className={classes.control}>
                <label>
                    Charge Per Day
                </label>
                <input
                    type="number" onChange={(e)=>changeHandler('chepestPrice',e)}
                    value={UpdateState.chepestPrice}
                />
                {error.associated==="chepestPrice"&&<h3 style={{color:"red"}}>{error.message}</h3>}
            </div>
            <div className={classes.actions}>

                <button onClick={props.onClose} className={classes.submit}>Cancel</button>
                <button onClick={submitHandler} className={classes.submit}>Submit</button>
            </div>
        </div>
        
        {loading&&<Modal>
            <h3 style={{textAlign:"center"}}>Processing Your Request...</h3>
            </Modal>}

        {message.length>0&&<Modal>
            <div><h3 style={{textAlign:"center"}}>{message}</h3>
            <div className="actions">

            <button onClick={processfullfill} className='submit'>Ok</button>
            </div>
            </div>
            </Modal>}
    </>

}

export default UpdateHotel
