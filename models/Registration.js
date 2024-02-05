import mongoose from "mongoose";
function formatedDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}
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
        default: formatedDate(new Date())// Set the default value to the current timestamp in milliseconds
      }
  }
);

export default mongoose.model("Registration", RegistrationSchema);
