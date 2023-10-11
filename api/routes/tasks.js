import express from "express"
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/task.js"
import { verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

//create
router.post("/", verifyUser, createTask)
//update
router.put("/:id", verifyUser, updateTask)
//get
router.get("/:id", verifyUser, getTask)
//getall
router.get("/", verifyUser, getAllTasks)
//delete
router.delete("/:id", verifyUser, deleteTask)

export default router