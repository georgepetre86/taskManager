
import Activities from "../models/Activities.js"

//create
export const createActivity = async (req, res, next) => {
    const newActivity = new Activities(req.body)
    try {
        const savedActivity = await newActivity.save()
        res.status(200).json(savedActivity)
    } catch (err) {
        next(err)
    }
}
//update
export const updateActivity = async (req, res, next) => {
    try {
        const updatedActivity = await Activities.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedActivity)
    } catch (err) {
        next(err)
    }
}
//delete
export const deleteActivity = async (req, res, next) => {
    try {
        await Activities.findByIdAndDelete(req.params.id)
        res.status(200).json("Activity has been deleted")
    } catch (err) {
        next(err)
    }
}
//get
export const getActivity = async (req, res, next) => {
    try {
        const activity = await Activities.findById(req.params.id)
        res.status(200).json(activity)
    } catch (err) {
        next(err)
    }
}
//getall
export const getAllActivities = async (req, res, next) => {
    try {
        const allActivities = await Activities.find()
        res.status(200).json(allActivities)
    } catch (err) {
        next(err)
    }
}

//add another comment
export const addAnotherComment = async (req, res, next) => {
    try {
        await Activities.findByIdAndUpdate(req.params.id, {$push:{"comment": req.body}})
       res.status(200).json("New comment was added")
   } catch (err) {
       next(err)
   }
}

//delete comment
export const deleteComment = async (req, res, next) => {
    try {
        await Activities.updateOne({_id: req.params.id}, {$pull:{comment: {_id: req.body.commentId}}})
        res.status(200).json("Comment deleted ")
    } catch (err) {
        next(err)
    }
}

//
export const addParentToActivity = async (req, res, next) => {
    try {
        if(!req.params.parent.includes("[")) {
            await Activities.updateOne({_id: req.params.id}, {$addToSet: {parent: req.params.parent}}, {upsert: true})
            res.status(200).json("Parent added")
        }
        
    } catch (err) {
        next(err)
    }
}
