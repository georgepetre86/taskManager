import express from "express";
import { createActivity, getAllActivities, updateActivity, deleteActivity, getActivity, addAnotherComment, deleteComment, addParentToActivity} from "../controllers/activities.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

router.post("/", verifyUser, createActivity)
router.get("/", verifyUser, getAllActivities)
router.put("/:id", verifyUser, updateActivity)
router.delete("/:id", verifyAdmin, deleteActivity)
router.get("/find/:id", verifyUser, getActivity)
router.put("/addAnotherComment/:id", verifyUser, addAnotherComment)
router.put("/deleteComment/:id", verifyUser, deleteComment)
router.put("/addParentToActivity/:id/:parent", verifyUser, addParentToActivity)


export default router