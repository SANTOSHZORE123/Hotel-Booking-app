import User from "../models/User.js";
import Registration from "../models/Registration.js"
import Room from "../models/Room.js"
import mongoose from "mongoose"
export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

const deleteRoomAvailable = async (existingRegistration) => {
  try {
    const roomInstance = await Room.findById(mongoose.Types.ObjectId(existingRegistration.room_id));
    roomInstance.unavailableDates = roomInstance.unavailableDates.filter((date) => {
      return !existingRegistration.stayDuration.includes(date);
    });

    await roomInstance.save();
  } catch (error) {
    throw new Error("Error deleting room availability: " + error.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // Finding user details
    const user = await User.findById(req.params.id);

    // Fetching registrations where username is user.username
    const registrations = await Registration.find({ username: user.username });

    // Use for...of loop to properly handle asynchronous operations
    for (const registration of registrations) {
      try {
        await deleteRoomAvailable(registration);
        await registration.remove();
      } catch (error) {
        console.error("Error deleting registration:", error);
        // Handle error or log as needed
      }
    }

    await user.remove();
    res.status(200).json({ message: "User has been deleted." });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(400).json({ message: "Action Denied!" });
  }
};

export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    //fetching number of registrations for each user
    const newUserArray=[]
    for (const user of users) {
      try {
        const registrations=await Registration.find({username:user.username})
        newUserArray.push({...user,_doc:{...user._doc,totalRegistrations:registrations.length}})
      } catch (error) {
        console.error("Error deleting registration:", error);
        // Handle error or log as needed
      }
    }
    res.status(200).json(newUserArray);
  } catch (err) {
    next(err);
  }
}