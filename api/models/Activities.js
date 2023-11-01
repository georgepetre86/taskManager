import mongoose from "mongoose";

const Activities = new mongoose.Schema({
    summary:{
        type: String,
        required: true,
    },
    asignee:{
        type: String,
    },
    priority:{
        type: String,
        required: true,
    },
    stage:{
        type: String,
        required: true,
    },
    attach:{
        type: String,
    },
    comment:{
        type: [String],
    }
},

{
    timestamps: true
})

export default mongoose.model("Activities", Activities)