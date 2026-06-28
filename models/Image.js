import { Schema, model } from "mongoose";

const ImageSchema = new Schema({
    fileName: {
        type: String,
        required: true,
        unique: true
    },
    imageContent: {
        data: Buffer,
        contentType: String
    }
})

export const Image = model("Image", ImageSchema)