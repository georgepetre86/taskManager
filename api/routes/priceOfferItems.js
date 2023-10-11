import express from "express";
import { createPriceOfferItem, deletePriceOfferItem, deletePriceOfferItemsFromOfferNumber, getAllPriceOfferItem, getPriceOfferItem, getPriceOfferItemsFromOfferNumber, updatePriceOfferItem } from "../controllers/priceOfferItem.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

//CREATE
router.post("/", verifyUser, createPriceOfferItem);
//UPDATE
router.put("/:id", verifyUser, updatePriceOfferItem);
//DELETE
router.delete("/:id", verifyAdmin, deletePriceOfferItem)
//GET
router.get("/:id", verifyUser,  getPriceOfferItem)
//GET ALL
router.get("/", verifyUser, getAllPriceOfferItem)
//GET based on offerNumber
router.get("/offerNumber/:name", verifyUser, getPriceOfferItemsFromOfferNumber)
//DELETE based on offerNumber
router.delete("/offerNumber/:name", verifyAdmin, deletePriceOfferItemsFromOfferNumber)


export default router;
