import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


// import sdf from "../../../server/uploads"

export const Products = () => {

    

 


    const [productList, setProductList] = useState()
    const [loggedIn, setLoggedIn] = useState()
    const [productValue, setProductValue] = useState()
    const [filterData, setFilterData] = useState({
        category: "All",
        price: 0}
    )
    

    const navigate = useNavigate()

    const filterHandler = (e) => {
        
        setFilterData({...filterData, [e.target.name]: e.target.value})
    }

    


    const addClickHandler = async (event) => {

        setLoggedIn(localStorage.userID)
        setProductValue(event.target.value)

        

        if (!localStorage.getItem("userID")) {
            window.location.replace('/auth');
            

        } else {
            try {
                await axios.put(`https://ecom-nwkh.onrender.com/${localStorage.userID}/${event.target.value}`)
            } catch (error) {
                console.log(error)
            }
        }




    }

    useEffect(() => {
        try {
            console.log(filterData)

            axios.get(`https://ecom-nwkh.onrender.com/allProduct/${filterData.category}/${filterData.price}`).then((response) => {
                setProductList(response.data.products)

            })
            //   console.log(productList[0])



        } catch (error) {
            console.log(error)
        }
    }, [filterHandler]);

    //    console.log(productList.products[0]._id)
    // console.log(productList[0]._id)









    return (

        <div className="h-screen bg-sky-200">
            <form 
            
            className=" flex bg-slate-200 w-full justify-center p-2">
                <select 
                onChange={filterHandler}
                className=" hover:bg-sky-300 p-1 pr-2 pl-2 m-1 drop-shadow-sm bg-slate-600 text-sky-100 font-semibold"
                name="category">
                    <option value="All">All</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Iphone">Iphone</option>
                    <option value="Boat">Boat</option>
                </select>
                <select 
                className=" hover:bg-sky-300 p-1 pr-2 pl-2 m-1 drop-shadow-sm bg-slate-600 text-sky-100 font-semibold"
                onChange={filterHandler}
                name="price">
                
                    <option value="0">All</option>
                    <option value="5000">0-5000</option>
                    <option value="10000">0-10000</option>
                
                </select>
                
            </form>
            <div className="grid grid-cols-4 gap-4 p-5">

                {
                    productList?.map((i) =>

                        <div
                            key={i._id}
                            className="  w-full max-w-sm bg-slate-800 bg-opacity-50 border border-gray-200 rounded-lg shadow">

                            <img className=" rounded-lg p-1 "
                                src={ !require(`./images/${i.productImage}`) ? "https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/image-line-icon.png" : require(`./images/${i.productImage}`) } 
                                    
                                />
                            <div className="px-4 pb-4">
                                <h2 className=" text-xl font-semibold tracking-tight text-white " >{i.title}</h2>
                                <h5 className=" text-yellow-200 font-bold text-2xl">₹ {i.price}</h5>

                                <p className=" text-white font-light " >Category: {i.category}</p>

                                <p>
                                    <span className=" text-base font-semibold text-yellow-100 " >Rating: </span>
                                    <span className=" text-base text-yellow-500 " > {i.rating} </span>
                                </p>
                            </div>

                            <button
                                value={i._id}
                                onClick={addClickHandler}

                                className=" rounded-lg bg-yellow-500 border-2 hover:bg-yellow-100 border-yellow-500 p-1 m-2 w-3/4"
                            >Add To Cart</button>

                        </div>
                    )
                }



            </div>


        </div>


    )
}