import mongoose from "mongoose";
import multer from "multer"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    
    rating:Number,
    
    productImage: String
})

export const ProductModel = mongoose.model("Product", productSchema)
