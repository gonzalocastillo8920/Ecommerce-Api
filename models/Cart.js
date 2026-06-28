import { model, Schema } from "mongoose";

const CartProductSelected = {
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number, 
        required: true
    }
}

const CartSchema = new Schema({
    cartItems: {
        type: [CartProductSelected],
        required: true,
        default: []
    }

}, {timestamps: true})

export const Cart = model("Cart", CartSchema)