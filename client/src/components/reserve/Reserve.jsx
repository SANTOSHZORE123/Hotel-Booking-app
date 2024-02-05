import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Reserve = ({ setOpen, hotelId ,HotelName,Location,Payment}) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);


  console.log("seerchdate",dates)
  const {user}=useContext(AuthContext)
  const getDatesInRange = (startDate, endDate) => {


    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = start;

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime()+19800000);
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  console.log("without process",alldates)

  const actualDate=alldates.map((date)=>{
    const dateString = new Date(date).toISOString().split('T')[0];
    return dateString
  })
  console.log("process",actualDate)

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.filter((date) =>{

      console.log(new Date(date).toISOString().split('T')[0])
      return actualDate.includes(new Date(date).toISOString().split('T')[0]);
      
    });

    return !isFound.length>0;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log(value)
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
            Payment,
            Location,HotelName,user
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) { }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">Room ID: {item.title}</div>
              <div className="rDesc"><span className="rTitle">Description: </span>{item.desc}</div>
              <div className="rPrice">Price Per Day: {item.price}&#8377;</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
            </div>
            <div className="room">
              
              <input
              style={{margin:"0px 0px 10px 0px"}}
                type="checkbox"
                value={item._id}
                onChange={handleSelect}
                {...(isAvailable(item) ? {} : { defaultChecked: true })}
                disabled={!isAvailable(item)}
              />
                {isAvailable(item)?<p style={{backgroundColor:"green"}}>Available</p>:<p style={{backgroundColor:"red"}}>Not Available</p>}
            </div>

          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
