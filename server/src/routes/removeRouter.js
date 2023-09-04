import express, { Router } from "express";
import { ProductModel } from "../models/Product.js";
import { UserModel } from "../models/User.js";
import bodyParser from 'body-parser';


const router = express.Router()



router.post("/:id/:product", async (req, res) => {

    const id= req.params.id
    const product = req.params.product
    

   try { await UserModel.findByIdAndUpdate(
        {_id: id},
        {
        $pull: {cart: product}
        }
        )
} catch (error) {
    console.log(error)
}}

    
)


export { router as removeRouter}




