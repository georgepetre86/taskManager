import mongoose from "mongoose";

const TaskNotes = new mongoose.Schema({
    summary:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    user:{
        type: String,
        required: true
    }
})

export default mongoose.model("TaskNote", TaskNotes)