import mongoose from "mongoose";

const Project = new mongoose.Schema({
    number:{
        type: String,
        required: true,
    },
    summary:{
        type:String,
        required: true,
    },
    priority:{
        type: String,
        required: true,
    },
    startDate:{
        type: String,
        required: true,
    },
    deadline:{
        type: String,
        required: true,
    },
    progress:{
        type: String,
        required: true,
    },
    stage:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    children:{
        type: [String],
    },
    parent:{
        type: String,
    },
    tasks:{
        type: [String],
    },
    workDetails:{
        type: [String]
    },
    details:{
        type: [String]
    }
})

export default mongoose.model("Project", Project)