import { Schema, model } from "mongoose";


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String
    },
    freeDelivery: {
        type: Boolean,
        default: false
    },
    ageFrom: {
        type: Number,
        required: true
    },
    ageTo: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

export const Products = model("Products", ProductSchema)