
import Registration from "../models/Registration.js"
import Room from "../models/Room.js";
import mongoose from "mongoose"

import Hotel from "../models/Hotel.js"
import User from "../models/User.js";
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}




const findActual=(dates)=>{
const actualDates=dates.map((milliseconds)=>{
  const date = new Date(milliseconds);

  // Format day of the month with leading zero if needed
  const day = date.getDate().toString().padStart(2, '0');

  // Get month in word form
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[date.getMonth()];
  
  // Concatenate day and month in the desired format
  const formattedDate = `${day} ${month}`;
  
  return formattedDate;
})
console.log(actualDates)
return actualDates;
}

export const getRegistration = async (req, res, next) => {
  try {
      // Extract the 'username' property from req.user
      const username = req.body.user;

      // Use the 'username' property in the query
      const registrations = await Registration.find({ username });
      const newArray=[]
      // Convert dates in each registration document using findActual function
      registrations.forEach(registration => {
          const stay = findActual(registration.stayDuration);
          newArray.push({...registration,_doc:{...registration._doc,stayDuration:[...stay]}})
      });

      // Log or return the results
      console.log(newArray)
      res.status(200).json(newArray);
  } catch (error) {
      console.log(error);
      res.status(404).send(error);
  }
};


  export const UpdateRegistration=async(req,res,next)=>{
    try {
      // Find the hotel registration entry based on the provided criteria
      const existingRegistration = await Registration.findById(req.body.RegisId);


      
      if (!existingRegistration) {
          // Handle case where the registration entry doesn't exist
          res.status(404).json({message:"Registration entry not found."});
          return;
      }


      //1. Pull registration dates
      const RegisteredDates=existingRegistration.stayDuration

      //2. fetching dates from room with room id
      const roomObjectId = mongoose.Types.ObjectId(req.body.room_id);
      const room = await Room.findById(roomObjectId);



      const remRegFromRoom = room.unavailableDates.filter((date)=>{
        return RegisteredDates.includes(date)
      })

      console.log("rahul registration dates",remRegFromRoom)
      //removing registration from curr
      room.unavailableDates= room.unavailableDates.filter((date)=>{
        return !RegisteredDates.includes(date)
      })
      const external=room.unavailableDates
      console.log("external user registration dates",room.unavailableDates)
      //checking room duration is available

      const actualDate=req.body.stayDuration.map((date)=>{
        const dateString = new Date(date).toISOString().split('T')[0];
        return dateString
      })

      const processexternal=external.map((date)=>{
        const dateString = new Date(date).toISOString().split('T')[0];
        return dateString
      })
      console.log("requested dates",req.body.stayDuration)
      const AlreadyRegistered = actualDate.filter((date)=>{

        return processexternal.includes(date)
    });
    console.log("Already",AlreadyRegistered)
    
      if(AlreadyRegistered.length>0){
        room.unavailableDates.push(...remRegFromRoom)
        await room.save()
        res.status(200).json({message:"Room is not available between this duration"})
        return;
      }

      
      // Update the existing entry with the new details
      const newDetails=req.body
      existingRegistration.set(newDetails); // Assuming newDetails is an object containing the updated details
      const updatedRegistration = await existingRegistration.save();
      
      
      //pushing new dates into room unavailable array
      room.unavailableDates.push(...newDetails.stayDuration)
      
      console.log("RoomNow",room.unavailableDates)
      const unpdateroom=await room.save()

      const stay=findActual(updatedRegistration.stayDuration)

      const newArray={...updatedRegistration}


      const newset={...newArray._doc,stayDuration:[...stay]}

      console.log("updated",newset)

      res.status(200).json({message:"Registration details updated successfully", updatedRegistration:newset,unpdateroom});
  } catch (error) {
    console.log(error)
      res.status(400).json({message:"Error updating Registration details", error});
  }
  }


  export const DeleteRegistration = async (req, res, next) => {
    try {
        // Find the hotel registration entry based on the provided criteria
        const existingRegistration = await Registration.findById(mongoose.Types.ObjectId(req.body._id))

        if (!existingRegistration) {
            // Handle case where the registration entry doesn't exist
            return res.status(404).json({ message: "Registration entry not found." });
        }

        const roomInstace=await Room.findById(mongoose.Types.ObjectId(existingRegistration.room_id))
        console.log(existingRegistration,roomInstace)
        roomInstace.unavailableDates=roomInstace.unavailableDates.filter((date)=>{
          return !existingRegistration.stayDuration.includes(date)
        })

        await roomInstace.save()


        // Delete the existing entry
        await existingRegistration.remove();

        res.status(200).json({ message: "Registration entry deleted successfully"});
    } catch (error) {
        console.error("Error deleting registration entry:", error);
        res.status(400).json({ message: "Error deleting registration entry", error: error.message });
    }
}




export const regispercity = async (req, res, next) => {
  try {
    const regis = await Registration.find();
    const registrationsPerCity = {};

    for (const reg of regis) {
      const room = await Room.findById(reg.room_id);
      const hotel = await Hotel.findById(room.Hotel);

      if (registrationsPerCity[hotel.city]) {
        // If city exists, update its count
        registrationsPerCity[hotel.city] += 1
      } else {
        // If city doesn't exist, add it to registrationsPerCity object
        registrationsPerCity[hotel.city] = 1;
      }
    }
    // Send the registrationsPerCity object as a successful response
    res.status(200).json(registrationsPerCity);
  } catch (error) {
    // Handle errors and send an empty object as the response
    res.status(400).json({});
  }
};



async function getRegistrationCount(req, res) {
  try {
    // Generate random data for the last 15 days
    const dates = [];
    const registrations = [];

    for (let i = 14; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(formatDate(date.getTime()));
      const registrationsCount = await Registration.countDocuments({ createdTime: formatDate(date.getTime()) });
      registrations.push(registrationsCount);
    }
console.log("this is data",{ dates, registrations })
    // Return the dates and registrations count as JSON response
    return res.status(200).json({ dates, registrations });
  } catch (error) {
    // Handle errors
    console.log("this is data",error)
    console.error("Error while fetching registration count:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Export the route handler function
export { getRegistrationCount };


export const getReceiptCount = async (req, res, next) => {
  const registrationId = req.params.id;
  try {
      const regis = await Registration.findById(registrationId);
      if (!regis) {
          return res.status(404).json({ error: "Registration not found" });
      }
        console.log("this is stay",regis.stayDuration)
      const fetchedData = {
          numRooms: 1,
          grandTotal: regis.Payment,
          discount: 2,
          finalAmount: regis.Payment - (regis.Payment * 2) / 100,
          status: "Pending...",
          bookedAt: regis.createdTime,
          checkInDate : formatDate(regis.stayDuration[0]),
          checkOutDate : formatDate(regis.stayDuration[regis.stayDuration.length - 1])
      };

      const rooms = await Room.findById(regis.room_id);
      const hotels = await Hotel.findById(rooms.Hotel);
      const user = await User.findOne({ username: regis.username });

      fetchedData.roomRate = rooms.price;
      fetchedData.roomNumber = rooms.title;
      fetchedData.hotelName = hotels.name;
      fetchedData.city = hotels.city;
      fetchedData.address = hotels.address;
      fetchedData.contact = hotels.contact;
      fetchedData.customerName = user.username;
      fetchedData.email = user.email;
      fetchedData.customerCity = user.city;
      fetchedData.phone = user.phone;

      res.status(200).json(fetchedData);
  } catch (error) {
      console.error("Error fetching receipt details:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

  