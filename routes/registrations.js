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

const router = express.Router();
//GET ALL

router.post("/",getRegistration);

router.post("/update",UpdateRegistration)

router.post("/delete",DeleteRegistration)

router.get("/regispercity",regispercity)

router.get("/count",getRegistrationCount)

router.get("/data/:id",getReceiptCount)
export default router;