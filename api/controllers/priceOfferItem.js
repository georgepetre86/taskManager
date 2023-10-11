import PriceOfferItem from "../models/PriceOfferItem.js";


export const createPriceOfferItem = async (req, res, next) => {
    const newPriceOfferItem = new PriceOfferItem(req.body);
  try {
    const savedPriceOfferItem = await newPriceOfferItem.save();
    res.status(200).json(savedPriceOfferItem);
  } catch (err) {
    next(err);
  }
}

export const updatePriceOfferItem = async (req, res, next) => {
    try {
        const updatedPriceOfferItem = await PriceOfferItem.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPriceOfferItem);
      } catch (err) {
        next(err);
      }
}

export const deletePriceOfferItem = async (req, res, next) => {
    try {
        await PriceOfferItem.findByIdAndDelete(req.params.id)
        res.status(200).json("Price offer has been deleted")
    } catch (err) {
       next(err)
    }
}

export const getPriceOfferItem = async (req, res, next) => {
    try {
        const priceOfferItem = await PriceOfferItem.findById(req.params.id)
        res.status(200).json(priceOfferItem)
    } catch (err) {
        next(err)
    }
}

export const getAllPriceOfferItem = async (req, res, next) => {
    
    
    try {
        const priceOfferItems = await PriceOfferItem.find();
        res.status(200).json(priceOfferItems)
    } catch (err) {
        next(err)
    }
}

export const getPriceOfferItemsFromOfferNumber = async (req, res, next) => {
  try {
    const priceOfferItems = await PriceOfferItem.find({offerNumber: req.params.name})
    res.status(200).json(priceOfferItems)
  } catch (err) {
    next(err)
  }
}

export const deletePriceOfferItemsFromOfferNumber = async (req, res, next) => {
  try {
    await PriceOfferItem.deleteMany({offerNumber: req.params.name})
    res.status(200).json("items deleted")
  } catch (err) {
    next(err)
  }
}

