import express from "express";
import { ProductModel } from "../models/Product.js";
import multer from "multer";
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';




const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "https://main--tfccommerce.netlify.app/static/media");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)

  }
});

var upload = multer({ storage: storage });

router.post("/addProduct", upload.single('productImage'), async (req, res) => {
  var newProduct = {
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    rating: req.body.rating,
    productImage: req.file.filename,
    
  }

  
  try {

    await ProductModel.create(newProduct)
    res.json({ status: "ok" })
  } catch (error) {
    res.json({ status: "Error" })
  }
})



export { router as productRouter };
