import express from "express";
import {
    getRegistration,
    UpdateRegistration,
    DeleteRegistration,
    regispercity,
    getRegistrationCount,
    getReceiptCount
} from "../controllers/registration.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import {verifyUser} from "../utils/verifyToken.js"

const router = express.Router();
//GET ALL

router.post("/",verifyUser,getRegistration);

router.post("/update",verifyUser,UpdateRegistration)

router.post("/delete",verifyUser,DeleteRegistration)

router.get("/regispercity",regispercity)

router.get("/count",getRegistrationCount)

router.get("/data/:id",verifyUser,getReceiptCount)
export default router;