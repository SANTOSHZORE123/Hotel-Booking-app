import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
  fetchdata
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/", createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", updateRoom);
//DELETE
router.delete("/:id/:hotelid", deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.post("/stats",fetchdata)

router.get("/", getRooms);

export default router;