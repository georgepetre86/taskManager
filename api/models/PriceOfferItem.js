import mongoose from "mongoose";

const PriceOfferItem = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    picture:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    details:{
        type: [String],
    },
    pending:{
        type: [String],
    },
    remarks:{
        type: [String],
    },
    client:{
        type: String,
        required: true
    },
    offerNumber:{
        type: String,
        required: true
    }

}, {
    timestamps: true
});

export default mongoose.model("PriceOfferItems", PriceOfferItem)