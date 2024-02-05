import React, { useState } from 'react'
import classes from "./HotelRegister.module.css"
import axios from 'axios'
import Modal from "../../../components/UpdateModal/Modal"
const HotelRegister = (props) => {
    const [UpdateState,setUpdate]=useState({
        contact:"",
        name:"",
        city:"",
        address:"",
        distance:"",
        chepestPrice:"",
        desc:"",
        type:"",
        featured:true,
        photos:[
            "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
            "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
            "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
            "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
            "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
          ]
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
        if(UpdateState.distance===""){
            setError({message:"distance must provided",associated:"distance"})
            return
        }
        setError({message:"",associated:""})
        if(UpdateState.chepestPrice===""){
            setError({message:"Provide Your latest charge",associated:"chepestPrice"})
            return
        }
        if(UpdateState.desc===""){
            setError({message:"Enter some description",associated:"desc"})
            return
        }
        setError({message:"",associated:""})
        setloading(true)
        try{
             const res=await axios.post("/hotels/",{...UpdateState})
             console.log(res)
             setloading(false)
             setmessage({message:res.data.message,isopen:true})
             props.fetchAgain()
        }catch(error){
            setloading(false)
            setmessage({message:error.data.message,isopen:true})
            props.fetchAgain()
        }


    }

    const processfullfill=()=>{
        setmessage({message:"",isopen:false})
        props.onClose()
    }

    return <>

        <h2 style={{ textAlign: "center" }}>Hotel Registration Form</h2>
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
            <label>Select Hotel Type:</label>
            <select onChange={(e) => changeHandler('type', e)}>
                <option value="">Select</option>
                <option value="hotel">Hotel</option>
                <option value="villas">Villas</option>
                <option value="apartments">Apartments</option>
                <option value="resorts">Resorts</option>
                <option value="cabins">Cabins</option>
                </select>
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
            <div className={classes.control}>
                <label>
                    Describe Your Hotel
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

        {message.message.length>0&&message.isopen&&<Modal>
        <div><h3 style={{textAlign:"center"}}>{message.message}</h3>
        <div className="actions">

        <button onClick={processfullfill} className='submit'>Ok</button>
        </div>
        </div>
        </Modal>}
        
    </>

}

export default HotelRegister
