import express from "express";
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from "../controllers/project.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

//create
router.post("/", verifyUser, createProject)
//update
router.put("/:id", verifyUser, updateProject)
//get
router.get("/:id", verifyUser, getProject)
//getall
router.get("/", verifyUser, getAllProjects)
//delete
router.delete("/:id", verifyAdmin, deleteProject)
export default router