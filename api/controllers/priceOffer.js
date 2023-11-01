import PriceOffer from "../models/PriceOffer.js";


//create
export const createPriceOffer = async (req, res, next) => {
    const newPriceOffer = new PriceOffer(req.body)
    try {
        const savedPriceOffer = await newPriceOffer.save()
        res.status(200).json(savedPriceOffer)
    } catch (err) {
        next(err)
    }
}
//update
export const updatePriceOffer = async (req, res, next) => {
    try {
        const updatedPriceOffer = await PriceOffer.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedPriceOffer)
    } catch (err) {
        next(err)
    }
}
//delete
export const deletePriceOffer = async (req, res, next) => {
    try {
        await PriceOffer.findByIdAndDelete(req.params.id)
        res.status(200).json("Price Offer has been deleted")
    } catch (err) {
        next(err)
    }
}
//get
export const getPriceOffer = async (req, res, next) => {
    try {
        const priceOffer = await PriceOffer.findById(req.params.id)
        res.status(200).json(priceOffer)
    } catch (err) {
        next(err)
    }
}
//getall
export const getPriceOffers = async (req, res, next) => {
    try {
        const priceOffers = await PriceOffer.find()
        res.status(200).json(priceOffers)
    } catch (err) {
        next(err)
    }
}


export const deleteIdFromItems = async (req, res, next) => {
    try {
        const item = PriceOffer.findById(req.params.id)
        const items = item.items
        
    } catch (err) {
        next(err)
    }
}