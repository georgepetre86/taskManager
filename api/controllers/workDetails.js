import WorkDetails from "../models/WorkDetails.js";

export const createWorkDetail = async (req, res, next) => {
    const newWorkDetail = new WorkDetails(req.body)

    try {
        const savedWorkDetail = await newWorkDetail.save()
        res.status(200).json(savedWorkDetail)
    } catch (err) {
        next(err)
    }
}

export const updateWorkDetail = async (req, res, next) => {

    try {
        const updatedWorkDetail = await WorkDetails.findByIdAndUpdate(req.params.id, { $set: req.body  }, {new: true})
        res.status(200).json(updatedWorkDetail)
    } catch (err) {
        next(err)
    }
}

export const getWorkDetail = async (req, res, next) => {
    try {
        const workDetail = await WorkDetails.findById(req.params.id)
        res.status(200).json(workDetail)
    } catch (err) {
        next(err)
    }
}

export const getAllWorkDetails = async (req, res, next) => {
    try {
        const workDetails = await WorkDetails.find()
        res.status(200).json(workDetails)
    } catch (err) {
        next(err)
    }
}

export const deleteWorkDetail = async (req, res, next) => {
    try {
        await WorkDetails.findByIdAndDelete(req.params.id)
        res.status(200).json("Work detail has been deleted")
    } catch (err) {
        next(err)
    }
}