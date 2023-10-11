import express  from "express";
import { createPriceOffer, deleteIdFromItems, deletePriceOffer, getPriceOffer, getPriceOffers, updatePriceOffer } from "../controllers/priceOffer.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

router.post("/", verifyUser, createPriceOffer)
router.put("/:id", verifyUser, updatePriceOffer)
router.delete("/:id", verifyAdmin, deletePriceOffer)
router.get("/:id", verifyUser, getPriceOffer)
router.get("/", verifyUser, getPriceOffers)
router.delete("/:id/items/:item", verifyUser, deleteIdFromItems)
export default router