import mongoose, { Schema } from "mongoose";

const Project = new mongoose.Schema({
    number:{
        type: String,
        required: true,
    },
    client:{
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
        default: Date.now(),
    },
    deadline:{
        type: String,
                
    },
    progress:{
        type: String,
        
    },
    stage:{
        type: String,
        
    },
    status:{
        type: String,
        
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
    workDetails:[
        new Schema({
        date: {type: Date, default: Date.now},
        file: {type: [String]}, 
        note: {type: String},
        user: {type: String},    
    })],
    details:{
        type: [String]
    }
})

export default mongoose.model("Project", Project)