import React, { useState } from 'react'
import "./SearchPnel.css"
import Modal from '../../components/UpdateModal/Modal'
import HotelRegister from './HotelRegister/HotelRegister'
import RegsiterRoom from "../Admin/RoomPanel/RegisterRoom"
const SearchPanel = (props) => {
  const [RegisterModal,setRegister]=useState(false)
  const [SearchState,setSearchState]=useState({
    Hotel:"",
    City:""
  })

  const ChangeHandler=(fieldName,e)=>{
    setSearchState((prev)=>{
      return {
        ...prev,[fieldName]:e.target.value.toLowerCase()
      }
    })
  }

  const submitHandler = () => {
      if(props.searchquery.s1==="Room"){
        const dataarray = props.Data.filter((room) => {
          return room.hotel.includes(SearchState.Hotel) && room.RoomId === SearchState.City;
      });
      props.onsearch(dataarray);
    }else{
      const dataarray = props.Data.filter((hotel) => {
          return hotel.name.includes(SearchState.Hotel) && hotel.city === SearchState.City;
      });
      props.onsearch(dataarray);
  }
}

const clearHandler=()=>{
    setSearchState({Hotel:"",City:""})
    props.onsearch(props.preserved)
}




  return <>
    <div className='searchContainer'>
      <div className='searchHotel'>
        <input type="text" placeholder='Hotel Name' value={SearchState.Hotel} onChange={(e)=>ChangeHandler("Hotel",e)}/>
        <input type="text"placeholder={props.searchquery.s2==="City"?"City Name":"RoomId"} value={SearchState.City} onChange={(e)=>ChangeHandler("City",e)}/>
        <button onClick={submitHandler}>Search</button>
        <button onClick={clearHandler}>Clear Filter</button>
      </div>
      <div>
        <button onClick={()=>setRegister(true)}>{props.searchquery.s1==="Room"?"Register Room":"Register Hotel"}</button>
      </div>
      
    </div>

    {RegisterModal&&props.searchquery.s1==="Hotel"&&<Modal onClose={()=>setRegister(false)}>
      <HotelRegister onClose={()=>setRegister(false)} fetchAgain={props.fetchAgain}/>
      </Modal>}

      {RegisterModal&&props.searchquery.s1==="Room"&&<Modal onClose={()=>setRegister(false)}>
      <RegsiterRoom onClose={()=>setRegister(false)} fetchAgain={props.fetchAgain}/>
      </Modal>}
  </>
}

export default SearchPanel
