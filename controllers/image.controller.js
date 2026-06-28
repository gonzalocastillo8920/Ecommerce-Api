import { Image } from "../models/Image.js"

export const readImage = async (req, res) => {
    const {id} = req.params

    try {
        const image = await Image.findById(id)
        const imageBuffer = Buffer.from(image.imageContent.data)

        res.writeHead(200,{
            "Content-Type": image.imageContent.contentType,
            "Content-Length": imageBuffer.length
        })
        res.end(imageBuffer)
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error del servidor al intentar obtener la imagen"
        })
    }
}