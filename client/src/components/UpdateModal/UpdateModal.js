import React, { useState } from 'react';
import axios from "axios"
import classes from "./UpdateModal.module.css";
const UpdateModal = ({onClose,onSubmit,initialValues }) => {
    const [stdate,setStartDateError]=useState(false)
    const [endError,setEndDateError]=useState(false)
    const [error,setError]=useState(false)

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const [formData, setFormData] = useState({
    Hotel: initialValues.Hotel,
    room: initialValues.room,
    Payment: initialValues.Payment,
    Location: initialValues.Location,
    room_id:initialValues.room_id
  });

  const handleDateChange = (fieldName, curr,date) => {
    if(fieldName==="startDate"){
      if(date<curr&&Math.abs(date-curr)>MILLISECONDS_PER_DAY){
        setStartDateError(true)
        return
      }
      setStartDateError(false)
    }else if(fieldName==="endDate"){
      if(date<curr&&Math.abs(date-curr)>MILLISECONDS_PER_DAY){
        setEndDateError(true)
        return
      }
      setEndDateError(false)
    }

    setFormData({
      ...formData,
      [fieldName]: date, // Save date as milliseconds
    });
  };

  const handleSubmit = async() => {
    if(formData.startDate===undefined){
      setStartDateError(true);
      return;
    }
    if(formData.endDate===undefined){
      setEndDateError(true);
      return;
    }

    console.log(formData.startDate,formData.endDate)
    let left=new Date(formData.startDate).getTime()
    let right=new Date(formData.endDate).getTime()
    if(left>right){
      setError(true);
      return;
    }
    if(stdate||endError)return ;
    setError(false)
    const stayDuration = generateDateRange(formData.startDate, formData.endDate);

    const updatedData = {
      Hotel: formData.Hotel,
      room: formData.room,
      stayDuration: stayDuration,
      Payment: formData.Payment*stayDuration.length,
      Location: formData.Location,
      room_id:formData.room_id
    };

    // Call the update registration route handler
    onSubmit(updatedData);
    onClose();
  };


  const handleCancel=()=>{
    onClose()
  }


  const generateDateRange = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dates.push(currentDate.getTime());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  return (
    <div className={classes.form}>
        <h2 style={{textAlign:"center"}}>Update Registration</h2>
        <div className={classes.innerForm}>
        <div className={classes.control}>
        <label>
          Hotel Name:
          </label>
          <input
            type="text"
            value={formData.Hotel}
            readonly
            className={classes.defaultColor}
          />
          </div>
          <div className={classes.control}>
        <label>
          Room Name:
          </label>
          <input
            type="text"
            value={formData.room}
            readonly
            className={classes.defaultColor}
            />
            </div>
            <div className={classes.control}>
        <label>
          Start Date:
          </label>
          <input
            type="date"
            onChange={(e) => handleDateChange('startDate',new Date().getTime(),new Date(e.target.value).getTime())}
          />
          {stdate&&<p className={classes.errorD}>Start Date is Required* also Don't select Past dates</p>}
          </div>

          <div className={classes.control}>
        <label>
          End Date:
          </label>
          <input
            type="date"
            onChange={(e) => handleDateChange('endDate', new Date().getTime(),new Date(e.target.value).getTime())}
          />
          {endError&&<p className={classes.errorD}>End Date is Required* also Don't select Past dates</p>}
          {error&&<div className={classes.errorD}>start date must be less than end date</div>}
          </div>
          
          <div className={classes.control}>
        <label>
          Charge Per Day (RS.):
          </label>
          <input
            type="text"
            value={formData.Payment}
            readonly
            className={classes.defaultColor}
            
          />
          </div>

          <div className={classes.control}>
        <label>
          Location:
          </label>
          <input
            type="text"
            value={formData.Location}
            readonly
            className={classes.defaultColor}
          />
      </div>
    </div>
      <div className={classes.actions}>

        <button onClick={handleCancel} className={classes.submit}>Cancel</button>
        <button onClick={handleSubmit} className={classes.submit}>Submit</button>
      </div>
    </div>
  );
};

export default UpdateModal;



