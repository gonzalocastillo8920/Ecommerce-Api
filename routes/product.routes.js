
import express from "express"
import {
        createProduct,
        deleteProduct,
        getProductById,
        getProducts,
        updateProduct } from "../controllers/product.controller.js"
        
import upload from "../util/storage.js"

const router = express.Router()

router.get("/", getProducts)
router.get("/byId/:id", getProductById)
router.post("/", upload.single("image"), createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router