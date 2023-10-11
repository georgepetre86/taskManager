import express from "express"
import { createTaskNote, deleteTaskNote, getAllTaskNotes, getTaskNote, updateTaskNote } from "../controllers/taskNotes.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"


const router = express.Router()

//create
router.post("/", verifyUser, createTaskNote)
//update
router.put("/:id", verifyUser, updateTaskNote)
//get
router.get("/:id", verifyUser, getTaskNote)
//getall
router.get("/", verifyUser, getAllTaskNotes)
//delete
router.delete("/:id", verifyAdmin, deleteTaskNote)
export default router