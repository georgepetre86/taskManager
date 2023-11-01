import express from "express";
import { createActivity, getAllActivities, updateActivity, deleteActivity, getActivity } from "../controllers/activities.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

router.post("/", verifyUser, createActivity)
router.get("/", verifyUser, getAllActivities)
router.put("/:id", verifyUser, updateActivity)
router.delete("/:id", verifyAdmin, deleteActivity)
router.get("/:id", verifyUser, getActivity)

export default router