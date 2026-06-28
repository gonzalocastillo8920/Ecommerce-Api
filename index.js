
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import cartRoutes from "./routes/cart.routes.js"
import checkoutRoutes from "./routes/checkout.routes.js"
import productRoutes from "./routes/product.routes.js"
import messagesRoutes from "./routes/messages.routes.js"
import imagesRoutes from "./routes/images.routes.js"

import { dbConnection } from "./database/dbConnection.js"

dotenv.config()

const port = process.env.PORT

const api = express()

dbConnection()

api.use(cors())
api.use(express.json())

api.use("/api/products", productRoutes)
api.use("/api/checkout", checkoutRoutes)
api.use("/api/cart", cartRoutes)
api.use("/api/message", messagesRoutes)
api.use("/image", imagesRoutes)

api.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`)
})