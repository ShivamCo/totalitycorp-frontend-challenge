import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { userRouter } from "./routes/userRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
//  import { newProRouter } from "./routes/newProRoutes.js";
import { cartRouter } from "./routes/cartRouter.js";
import { userDetailRouter } from "./routes/userDetailsRouter.js"
import { removeRouter } from "./routes/removeRouter.js";
import { allProductRoutes } from "./routes/allProductRoutes.js";

import dotenv from "dotenv"

dotenv.config();

const mongoURL = process.env.MONGODB_URL


const app = express()
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", userRouter)
app.use("/", productRouter)
app.use("/updateCart", cartRouter )
app.use("/userDetail", userDetailRouter)
app.use("/removeRouter" , removeRouter)
app.use("/allProduct" , allProductRoutes)



mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


app.listen(PORT, () => {
    console.log(`Serve is live on ${PORT}`)
})
