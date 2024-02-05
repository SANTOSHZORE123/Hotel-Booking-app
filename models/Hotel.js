  import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
  },
  minPrice:{
    type:Number,
    required:false
  },
  maxPrice:{
    type:Number,
    required:false
  },
  title: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  chepestPrice: {
    type: Number,
    required: true,
  },
  contact:{
    type:Number,
    required:true
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Hotel", HotelSchema)