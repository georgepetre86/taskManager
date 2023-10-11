import mongoose from "mongoose";

const PriceOffer = new mongoose.Schema({
    items:{
        type: [String],
    },
    price:{
        type: String,
        required: true,
    },
    summary:{
        type: String,
    },
    client: {
        type: String,
    },
    offerNumber:{
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
})

export default mongoose.model("PriceOffer", PriceOffer)