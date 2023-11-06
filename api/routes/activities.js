import express from "express";
import { createActivity, getAllActivities, updateActivity, deleteActivity, getActivity, addAnotherComment, deleteComment } from "../controllers/activities.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

router.post("/", verifyUser, createActivity)
router.get("/", verifyUser, getAllActivities)
router.put("/:id", verifyUser, updateActivity)
router.delete("/:id", verifyAdmin, deleteActivity)
router.get("/:id", verifyUser, getActivity)
router.put("/addAnotherComment/:id", verifyUser, addAnotherComment)
router.put("/deleteComment/:id", verifyUser, deleteComment)

export default router