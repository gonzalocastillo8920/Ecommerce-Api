
import express from "express"
import { createCart, getCarts } from "../controllers/cart.controller.js"

const router = express.Router()

router.post("/", createCart)
router.get("/", getCarts)

export default router