import TaskNotes from "../models/TaskNotes.js"

export const createTaskNote = async (req, res, next) => {
    const newTaskNote = new TaskNotes(req.body)

    try {
        const savedTaskNote = await newTaskNote.save()
        res.status(200).json(savedTaskNote)
    } catch (err) {
        next(err)
    }
}

export const updateTaskNote = async(req, res, next) => {
    try {
        const updatedTaskNote = await TaskNotes.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedTaskNote)
    } catch (err) {
        next(err)
    }
}

export const getTaskNote = async(req, res, next) => {
    try {
        const taskNote = await TaskNotes.findById(req.params.id)
        res.status(200).json(taskNote)
    } catch (err) {
        next(err)
    }
}

export const getAllTaskNotes = async (req, res, next) => {
    try {
        const taskNotes = await TaskNotes.find()
        res.status(200).json(taskNotes)
    } catch (err) {
        next(err)
    }
}

export const deleteTaskNote = async (req, res, next) => {
    try {
        await TaskNotes.findByIdAndDelete(req.params.id)
        res.status(200).json("Task note has been deleted")
    } catch (err) {
        next(err)
    }
}