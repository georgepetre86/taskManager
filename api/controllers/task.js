import Task from "../models/Task.js";

export const createTask = async (req, res, next) => {
    const newTask = new Task(req.body)

    try {
        const savedTask = await newTask.save()
        res.status(200).json(savedTask)
    } catch (err) {
        next(err)
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedTask)
    } catch (err) {
        next(err)
    }
}

export const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
        res.status(200).json(task)
    } catch (err) {
        next(err)
    }
}

export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (err) {
        next(err)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.status(200).json("Task has been deleted")
    } catch (err) {
        next(err)
    }
}