import { useState } from "react";
import axios from "axios";
import dotenv from "dotenv"




export const AddProducts = () => {

    dotenv.config();

    const BASE_URL = process.env.BASE_URL


    const [inputData, setInputData] = useState({
        title: "",
        price: 0,
        category: "",
        rating: 0,
        productImage: ""


    })



    const inputHandler = (event) => {
        setInputData({ ...inputData, [event.target.name]: event.target.value })

    }

    const onImageChange = (event) => {

        setInputData({ ...inputData, productImage: event.target.files[0] })
    }


    const onClickHandler = (event) => {

        event.preventDefault()

        const formData = new FormData();

        formData.append("productImage", inputData.productImage, inputData.productImage.name);
        formData.append("title", inputData.title);
        formData.append("price", inputData.price);
        formData.append("category", inputData.category);
        formData.append("rating", inputData.rating);



        try {
            axios.post(`${BASE_URL}/addProduct`,

                formData)
            alert("Product Upload Success!")
        } catch (error) {
            console.log(error)
        }


    }




    return (

        <div className="grid justify-center pt-5">
            <h2
                className=" text-2xl font-semibold text-blue-500 underline underline-offset-4 pb-6" >
                Add a New Product</h2>
            <form
                onSubmit={onClickHandler}
                enctype="multipart/form-data"
                className=" w-1/3 grid grid-rows-6 grid-flow-col gap-4 ">
                <input
                    name="title"
                    onChange={inputHandler}
                    className=" border-sky-500 border-2 p-1 rounded-lg pl-2 mb-1"
                    type="text"
                    placeholder="Product Name"></input>

                <input
                    name="price"
                    onChange={inputHandler}
                    className=" border-sky-500 border-2 p-1 rounded-lg pl-2 mb-1"
                    type="number"
                    min="0.00" max="10000"
                    placeholder="Price"></input>

                <input
                    name="category"
                    onChange={inputHandler}
                    className=" border-sky-500 border-2 p-1 rounded-lg pl-2 mb-1"
                    type="text"
                    placeholder="Category"></input>

                <input
                    name="rating"
                    accept="images/*"
                    onChange={inputHandler}
                    className=" border-sky-500 border-2 p-1 rounded-lg pl-2 mb-1"
                    type="number"
                    min="1" max="5"
                    placeholder="Rating"></input>

                <input

                    className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    type="file"

                    name="productImage"
                    onChange={onImageChange}
                ></input>

                <button
                    className="border-2 rounded-xl bg-blue-500 text-xl font-semibold text-white pb-1"
                    type="submit">Add Product</button>

            </form>
        </div>



    )


}