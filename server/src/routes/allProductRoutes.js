import express, { Router } from "express";
import { ProductModel } from "../models/Product.js";
import { UserModel } from "../models/User.js";
import bodyParser from 'body-parser';


const router = express.Router()


router.get("/:category/:price", async (req, res) => {

    const category = req.params.category
    const price = req.params.price
  
    if(category == "All" && price > 0){
      const products = await ProductModel.find({
        price: {$lte: price}
      });
        res.json({ products })
      
    }
  
    else if(category != "All" && price > 0 ){
      const products = await ProductModel.find({
        price: {$lte: price},
        category: category
      });
        res.json({ products })
      
    }
  
    else if(category != "All" && price == 0 ){
      const products = await ProductModel.find({
        
        category: category
      });
        res.json({ products })
      
    }
        
    else {
        const products = await ProductModel.find();
        res.json({ products })
        
    }
  
  })

  export { router as allProductRoutes }