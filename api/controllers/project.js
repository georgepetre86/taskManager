import Project from "../models/Project.js";

export const createProject = async (req, res, next) => {
    const newProject = new Project(req.body)
    try {
        const savedProject = await newProject.save()
        res.status(200).json(savedProject)
    } catch (err) {
        next(err)
    }
}

export const updateProject = async (req, res, next) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedProject)
    } catch (err) {
        next(err)
    }
}

export const getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id)
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
}

export const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
}

export const deleteProject = async (req, res, next) => {
    try {
        await Project.findByIdAndDelete(req.params.id)
        res.status(200).json("Project has been deleted")
    } catch (err) {
        next(err)
    }
}

export const getLastElement = async (req, res, next) => {
    
    try {
       
        const elem = await Project.find().sort({$natural:-1}).limit(1)
        res.status(200).json(elem[0].number)
    } catch (err) {
        next(err)
    }
}

export const getActiveList = async (req, res, next) => {
    try {
        const elem = await Project.find({ "status" : "ontrack"})
        res.status(200).json(elem)
    } catch (err) {
        next(err)
    }
} 

export const addActivityToProject = async (req, res, next) => {
    try {
        const updatedProject = await Project.updateOne({_id: req.params.id}, {$addToSet: {activities: req.params.activity}}, {upsert: true})
        res.status(200).json(updatedProject)
    } catch (err) {
        next(err)
    }
}

export const addAnotherWorkDetail = async (req, res, next) => {
    try {
        await Project.findByIdAndUpdate(req.params.id, {$push:{"workDetails": req.body}})
       res.status(200).json("New work detail was added")
   } catch (err) {
       next(err)
   }
}

export const addAnotherFile = async (req, res, next) => {
    try {
        await Project.findByIdAndUpdate(req.params.id, {$push:{"files": req.body}})
        res.status(200).json("New file has been updated")
    } catch (err) {
        next(err)
    }
}