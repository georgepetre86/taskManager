import mongoose from "mongoose";

const Task = new mongoose.Schema({
    summary:{
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        
    },
    asignee:{
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    priority:{
        type: String,
    },
    notes:{
        type: [String]
    },
    status:{
        type: String,
        required: true
    }
})

export default mongoose.model("Task", Task)