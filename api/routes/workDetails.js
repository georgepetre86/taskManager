import express from "express"
import { createWorkDetail, deleteWorkDetail, getAllWorkDetails, getWorkDetail, updateWorkDetail } from "../controllers/workDetails.js"

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"
const router = express.Router()


//create
router.post("/", verifyUser, createWorkDetail)
//update
router.put("/:id", verifyUser, updateWorkDetail)
//get
router.get("/:id", verifyUser, getWorkDetail)
//getall
router.get("/", verifyUser, getAllWorkDetails)
//delete
router.delete("/:id", verifyAdmin, deleteWorkDetail)

export default router