import { Cart } from "../models/Cart.js"

export const createCart = async (req, res) => {
    const data = req.body

    try {
        const newCart = await Cart.create(data)

        res.status(201).json({
            ok: true,
            msg: "carrito creado correctamente.",
            cart: newCart
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error del servidor al intentar crear el carrito."
        })
    }
}

export const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
                                .populate("cartItems.product")

        res.json({
            ok: true,
            msg: "carritos obtenidos correctamente",
            carts
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error del servidor al intentar obtener los carritos."
        })
    }
}
