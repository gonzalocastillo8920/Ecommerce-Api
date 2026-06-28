
import express from "express"
import { readImage } from "../controllers/image.controller.js"

const router = express.Router()

router.get("/:id", readImage)

export default router