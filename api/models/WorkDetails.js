import mongoose from "mongoose";

const WorkDetails = new mongoose.Schema({
    note:{
        type: String,
        required: true,
    },
    files:{
        type:[String],

    },
    date:{
        type: String,
        required: true,
    },
    submitter:{
        type: String,
        required: true,
    }
})

export default mongoose.model("WorkDetail", WorkDetails)