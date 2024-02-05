import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
      username: {
        type: String,
        required: true
      },
      room: {
        type: String,
        required: true
      },
      Hotel: {
        type: String,
        required: true
      },
      Payment: {
        type: Number,
        required: true
      },
      Location:{
        type: String,
        required: true
      },
      room_id: {
        type: String,
        required: true
      },
      stayDuration: {
        type: [Number]
      },
      createdTime: {
        type: String,
        default: new Date().toLocaleDateString()// Set the default value to the current timestamp in milliseconds
      }
  }
);

export default mongoose.model("Registration", RegistrationSchema);
