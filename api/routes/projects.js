import express from "express";
import { addActivityToProject, addAnotherFile, addAnotherWorkDetail, createProject, deleteProject, getActiveList, getAllProjects, getLastElement, getProject, updateProject } from "../controllers/project.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

//create
router.post("/", verifyUser, createProject)
//update
router.put("/:id", verifyUser, updateProject)
//get
router.get("/find/:id", verifyUser, getProject)
//getall
router.get("/", verifyUser, getAllProjects)
//delete
router.delete("/:id", verifyAdmin, deleteProject)
//get last element added
router.get("/getLastElement/", verifyUser, getLastElement)
//get list with active projects
router.get("/getActiveList/", verifyUser, getActiveList)
//add activity to project
router.put("/addActivityToProject/:id/:activity", verifyUser, addActivityToProject)
//add another work detail to array
router.put("/addAnotherWorkDetail/:id", verifyUser, addAnotherWorkDetail)
//add file to files
router.put("/addAnotherFile/:id", verifyUser, addAnotherFile)
export default router