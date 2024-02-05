import Room from "../models/Room.js";
import User from "../models/User.js"
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import Registration from "../models/Registration.js"

export const createRoom = async (req, res, next) => {
  const hotels=await Hotel.findOne({name:req.body.name,city:req.body.city,address:req.body.address})
  const hotelId = hotels._id;

  console.log("this is hotel id on which we want to register hotel",hotelId)
  const newRoom = new Room({
    title:req.body.RoomId,
    price:hotels.chepestPrice,
    maxPeople:req.body.maxPeople,
    desc:req.body.desc,
    Hotel:hotelId
  });

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      res.status(400).json("error in creating room")
    }
    res.status(200).json("Room is created successfully");
  } catch (err) {
    res.status(400).json("error in creating room")
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};


export const updateRoomAvailability = async (req, res, next) => {

  console.log(req.body)
  try {
    const roomId = req.params.id;
    const { dates ,Payment,Location,HotelName,user} = req.body;

    // Step 1: Get room details from the provided ID
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const currentTime = new Date().getTime();

    // Step 2: Remove dates from unavailableDates array that are less than the current time
    room.unavailableDates = room.unavailableDates.filter(date => date >= currentTime);

    // Step 3: Update the room details by pushing new dates into the unavailableDates array
    room.unavailableDates.push(...dates);

    // room.Hotel=HotelName
    
    await room.save();

    // Assuming roomId is the ObjectId of the room
    console.log("this is room",room)

    const Register = new Registration({
      username:user,
      room:room.title,
      Hotel:HotelName,
      Payment:Payment,
      Location:Location,
      stayDuration:dates,
      room_id:roomId
      });

      
    const RoomAdded=await Register.save();
    res.status(200).json(RoomAdded);
  } catch (err) {
    next(err);
  }
};


export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
      try{
        await Registration.deleteMany({room_id:req.params.id})
      }catch(err){
        res.status(400).json("Error in deleting room.");
      }
    } catch (err) {
      res.status(400).json("Error in deleting room.");
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    res.status(400).json("Error in deleting room.");
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    console.log(room)
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};


const findRoomId=(roomId)=>{
  const roomLastThreeDigits = roomId.toString().slice(-4);

// Convert the last three digits to a string
const roomTitle = roomLastThreeDigits.toString();
return roomTitle

}


export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

    const newArray=[];

    for(const room of rooms){
      console.log("room",room)
      const item={hotelId:"",contact:"",hotel:"",RoomId:room.title,city:"",price:"",_id:room._id,address:""}
      try{
        const hotel=await Hotel.findById(room.Hotel)
        item.hotel=hotel.name
        item.city=hotel.city
        item.price=hotel.chepestPrice
        item.contact=hotel.contact
        item.address=hotel.address
        item.hotelId=room.Hotel
      }catch(err){

      }
      newArray.push(item)
    }
    res.status(200).json(newArray);
  } catch (err) {
    res.status(400).json("error in finding rooms");
  }
};


{/* <StatContainer title="Number of Registrations done" value={100} />
      <StatContainer title="Total payment received" value={50} />
      <StatContainer title="Number of Hotels registered" value={75} />
      <StatContainer title="Number of users registered" value={90} /> */}


export const fetchdata=async(req,res,next)=>{
  const title=req.body.title
  try{
    if(title==="Number of Registrations done"){
      try{
      const total=await Registration.countDocuments();
      res.status(200).json(total)
      }catch(err){
        res.status(400).json(0)
      }
    }
    if(title==="Total payment received"){
      try{
      const regis = await Registration.find(); // Retrieve all documents from the Registration collection
      let totalPayment = 0; // Initialize the total payment sum

      // Iterate through each document and sum up the "Payment" field
      for (const reg of regis) {
          totalPayment += reg.Payment;
      }
      res.status(200).json(totalPayment)

    }catch(err){
        res.status(400).json(0)
      }
    }
    if(title==="Number of Hotels registered"){
      try{
      const total=await Hotel.countDocuments();
      res.status(200).json(total)
      }catch(err){
        res.status(400).json(0)
      }
    }
    if(title==="Number of users registered"){
      try{
      const total=await User.countDocuments();
      res.status(200).json(total)
      }catch(err){
        res.status(400).json(0)
      }
    }
  }catch(error){
    res.status(400).json(34);
  }
}
