
import express from "express"
import { createPreferenceMP } from "../controllers/checkout.controller.js"

const router = express.Router()

router.post("/", createPreferenceMP)

export default router