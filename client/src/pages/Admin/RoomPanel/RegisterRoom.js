import React, { useState } from 'react'
import classes from "./RegisterRoom.module.css"
import axios from 'axios'
import Modal from "../../../components/UpdateModal/Modal"
const RoomRegister = (props) => {
    const [UpdateState,setUpdate]=useState({
        name:"",
        city:"",
        address:"",
        RoomId:"",
        maxPeople:0,
        desc:""
    })
    const [error,setError]=useState({
        message:"",
        associated:""
    })
    const [loading,setloading]=useState(false)
    const [message,setmessage]=useState({message:"",isopen:false})










    const changeHandler=(fieldName,e)=>{
        console.log(fieldName,e.target.value)
        setUpdate((prev)=>{
            return {
                ...prev,[fieldName]:e.target.value.toLowerCase()
            }
        })
    }

    const submitHandler=async()=>{
        setError({message:"",associated:""})
        if(UpdateState.name===""){
            setError({message:"Provide Hotel Name",associated:"name"})
            return
        }
        setError({message:"",associated:""})
        if(UpdateState.city===""){
            setError({message:"City name is required",associated:"city"})
            return
        }
        setError({message:"",associated:""})
        if(UpdateState.address===""){
            setError({message:"address",associated:"address"})
            return
        }
        setError({message:"",associated:""})
        if(UpdateState.RoomId===""){
            setError({message:"RoomId must be unique and required*",associated:"RoomId"})
            return
        }
        setError({message:"",associated:""})
        if(UpdateState.maxPeople===""){
            setError({message:"Number of peoples to stay in one room",associated:"maxPeople"})
            return
        }
        setError({message:"",associated:""})
        if(UpdateState.desc===""){
            setError({message:"Enter some description",associated:"desc"})
            return
        }
        setError({message:"",associated:""})
        setloading(true)
        try{
             const res=await axios.post("/rooms/",{...UpdateState})
             console.log(res)
             setloading(false)
             setmessage({message:res.data,isopen:true})
             props.fetchAgain()
        }catch(error){
            setloading(false)
            setmessage({message:error.data,isopen:true})
            props.fetchAgain()
        }


    }

    const processfullfill=()=>{
        setmessage({message:"",isopen:false})
        props.onClose()
    }

    return <>

        <h2 style={{ textAlign: "center" }}>Room Registration Form</h2>
        <div>
            <h5 style={{color:"red",textAlign:"center"}}>Please enter your existing hotel name, city and address exactly correct to allocate room to correct Hotel.</h5>
            
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
                    RoomId:
                </label>
                <input
                    type="number" onChange={(e)=>changeHandler('RoomId',e)}
                    value={UpdateState.RoomId}
                />
                {error.associated==="RoomId"&&<h3 style={{color:"red"}}>{error.message}</h3>}
            </div>
            <div className={classes.control}>
                <label>
                    Max People allowed:
                </label>
                <input
                    type="number" onChange={(e)=>changeHandler('maxPeople',e)}
                    value={UpdateState.maxPeople}
                />
                {error.associated==="maxPeople"&&<h3 style={{color:"red"}}>{error.message}</h3>}
            </div>
            <div className={classes.control}>
                <label>
                    Describe Your Room:
                </label>
                <textarea
                value={UpdateState.desc}
                onChange={(e) => changeHandler('desc', e)}
                placeholder="Enter description about the hotel..."
            />
            {error.associated==="desc"&&<h3 style={{color:"red"}}>{error.message}</h3>}
            </div>

            <div className={classes.actions}>

                <button onClick={props.onClose} className={classes.submit}>Cancel</button>
                <button onClick={submitHandler} className={classes.submit}>Submit</button>
            </div>
        </div>


        {loading&&<Modal>
            <h3 style={{textAlign:"center"}}>Processing Your Request...</h3>
            </Modal>}

        {message.message&&message.message.length>0&&message.isopen&&<Modal>
        <div><h3 style={{textAlign:"center"}}>{message.message}</h3>
        <div className="actions">

        <button onClick={processfullfill} className='submit'>Ok</button>
        </div>
        </div>
        </Modal>}
    </>

}

export default RoomRegister
