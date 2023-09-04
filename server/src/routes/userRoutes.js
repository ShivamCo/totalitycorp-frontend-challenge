import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import dotenv from "dotenv"

dotenv.config();


const router = express.Router();
const salt =10;
const myPlainText = process.env.MY_PLANE_TEST;
const someOtherText = process.env.SOME_OTHER_PASSWORD;

router.post("/register", async(req,res) => {

    const { username, password } = req.body;
    const user = await UserModel.findOne({username});

    if(user){
        return res.json({message: "User already exists!"})
    }

    
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({username, password: hashedPassword});
        await newUser.save();

        res.json({"message": "User Registered Successfully!"})


} )

router.post("/login", async(req,res)=> {

    const { username, password} = req.body;
    const user = await UserModel.findOne({username});

    if(!user){
        return res.json({message: "user not exists"})
    }
    
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.json({
                message: "Username or Password is Wrong"
            })
        }

    

    const token = jwt.sign({id: user._id}, myPlainText);
    res.json({token, userID: user._id})


})

export {router as userRouter};
