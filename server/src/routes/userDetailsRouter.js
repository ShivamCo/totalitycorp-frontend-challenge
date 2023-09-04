import express, { Router } from "express";
import { ProductModel } from "../models/Product.js";
import { UserModel } from "../models/User.js";
import bodyParser from 'body-parser';


const router = express.Router()



router.get("/:id", async (req, res) => {

    const id = req.params.id
   
    

    try {
        const currentUser = await UserModel.find({ _id: id })

        const currentCart = currentUser[0].cart
        
        
        // const allCartList = []

        const allCartList = await ProductModel.find({
            '_id': {
                $in: currentCart

        }})
        
        res.send(allCartList)





    } catch (error) {
        console.log(error)
    }
}


)

export { router as userDetailRouter }
