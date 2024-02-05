import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Registration from "../models/Registration.js"
export const createHotel = async (req, res, next) => {
  console.log(req.body)
  const newHotel = new Hotel(req.body);
  try {

    const savedHotel = await newHotel.save();
    res.status(200).json({message:"Hotel Created successfully"});
  } catch (err) {
    res.status(400).json({message:"Opps! Hotel can't created"});
  }
};
export const updateHotel = async (req, res, next) => {
  try {

    const prevHotelDetails = await Hotel.findById(req.params.id);
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    await Room.updateMany(
      { Hotel: req.params.id },
      { $set: { price: req.body.chepestPrice } } // Update with the new minimum price of the hotel, you may adjust this according to your requirements
    );

    const regis = await Registration.find({ Hotel: prevHotelDetails.name, Location: prevHotelDetails.address });
      console.log("this is previuos",prevHotelDetails,"this is now",regis)
    for (const reg of regis) {
      try {
        const newPayment = reg.stayDuration.length * req.body.chepestPrice;
        await Registration.findByIdAndUpdate(reg._id, { $set: { Hotel: req.body.name, Location: req.body.address, Payment: newPayment } });
      } catch (error) {
        console.error("Error updating registration:", error);
        // Handle error or log as needed
      }
    }

    
    res.status(200).json({message:"hotel details updated successfully"});
  } catch (err) {
    res.status(400).json({message:"error while updating Hotel details"});
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    //fetching hotel
    const hotel=await Hotel.findById(req.params.id);

    //fetching all room ids present in rooms array of hotel
    const roomIDs=hotel.rooms;

    //deleting registrations for given room
    for(const room of roomIDs){
      try{
        await Registration.deleteMany({room_id:room})
      }catch(error){

      }
    }

    //deleting rooms itself
    for(const room of roomIDs){
      try{
        await Room.findByIdAndDelete(room)
      }catch(error){

      }
    }

    //deleting hotel
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max,...others } = req.query;
  try {
    if(req.query.featured===undefined){

      const hotels = await Hotel.find({
       ...others,
        chepestPrice: { $gte: min || 1, $lte: max || 10000000}
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    }
    else{
      const hotels = await Hotel.find({
        featured:req.query.featured
      }).limit(req.query.limit);
       res.status(200).json(hotels);
    }
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
    const resortCount = await Hotel.countDocuments({ type: "resorts" });
    const villaCount = await Hotel.countDocuments({ type: "villas" });
    const cabinCount = await Hotel.countDocuments({ type: "cabins" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
