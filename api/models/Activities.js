import mongoose, { Schema } from "mongoose";

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
    parent:{
        type: [String]
    } 
    ,
    attach:{
        type: [String],
    },
    comment:[
        new Schema({
        date: {type: Date, default: Date.now}
        , 
        note: {type: String},
        user: {type: String},    
    })]
},

{
    timestamps: true
})

export default mongoose.model("Activities", Activities)