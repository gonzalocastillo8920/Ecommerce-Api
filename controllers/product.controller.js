
import fs from "node:fs"

import { Image } from "../models/Image.js"
import { Products } from "../models/Product.js"

export const getProducts = async (req, res) => {
    const {limit = "10", pageNumber = "1"} = req.query

    const limitParsed = parseInt(limit)
    const pageNumberParsed = parseInt(pageNumber)

    try {
        const findQuery = {deletedAt: null}
        const productCount = await Products.countDocuments(findQuery)

        const products = await Products.find(findQuery)
                                        .skip(pageNumberParsed > 1 ? (pageNumberParsed - 1) * limitParsed : 0)
                                        .limit(limitParsed)

        const productsWithMongoImage = products.map(({_doc}) => ({
            ..._doc,
            image: _doc.image.startsWith("http")? _doc.image : `${process.env.API_BASE_URL}${_doc.image}`
        }))
                
        res.json({
            ok: true,
            msg: "productos obtenidos correctamente.",
            products: productsWithMongoImage,
            total: productCount,
            totalPages: Math.ceil(productCount / limitParsed),
            pageNumber: pageNumberParsed
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error del servidor al intentar obtener los productos."
        })
    }
}

export const getProductById = async (req, res) => {
    const {id} = req.params

    try {
        const product = await Products.findOne({_id: id, deletedAt: null})

        if(!product) {
            return res.status(404).json({
            ok: false,
            msg: "producto no encontrado."
        })
        }
        res.json({
            ok: true,
            msg: "producto obtenido correctamente.",
            product
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error del servidor al intentar obtener el producto."
        })
    }
}

export const createProduct = async (req, res) => {
    const dataProduct = req.body
    const file = req.file

    try {

        if(!file) {
            return res.status(400).json({
                ok: false,
                msg: "la imagen del producto es obligatoria"
            })
        }

        const imageBuffer = fs.readFileSync("./" + file.path)

        const image = await Image.create({
            fileName: file.filename,
            imageContent: {
                data: imageBuffer,
                contentType: "image/png"
            }
        })

        const newProduct = await Products.create({
            ...dataProduct,
            image: `/image/${image._id}`
        })

        fs.rm("./" + file.path, error => {
            if(error) {
                console.log("error al eliminar la imagen temporal:", error)
            } else {
                console.log("imagen temporal eliminada correctamente")
            }
        })

        res.status(201).json({
            ok: true,
            msg: "producto creado correctamente",
            product: newProduct
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error del servidor al intentar crear el producto"
        })
    }

}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const productFound = await Products.findOne({ _id: id, deletedAt: null})

        if (!productFound) {
            return res.status(404).json({
                ok: false,
                msg: "producto no encontrado."
            })
        }
        const updatedProduct = await Products.findByIdAndUpdate(id, data, {returnDocument: "after"})
        res.json({
            ok: true,
            msg: "producto actualizado correctamente",
            product: updatedProduct
        })
    } catch (error){
        res.status(500).json({
            ok: false,
            msg: "error del servidor al intentar actualizar el producto."
        })
    }
}

export const deleteProduct = async (req, res) => {
    const { id }= req.params

    try {
        const productFound = await Products.findOne({ _id: id, deletedAt: null})

        if (!productFound) {
            return res.status(404).json({
                ok: false,
                msg: "producto no encontrado."
            })
        }
        await Products.findByIdAndUpdate(id, { deletedAt: new Date()})
        res.json({
            ok: true,
            msg: "producto eliminado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error del servidor al intentar eliminar el producto."
        })
    }
}
