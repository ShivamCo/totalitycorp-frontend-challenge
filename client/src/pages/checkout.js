import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { Route } from "react-router-dom";



export const Checkout = () => {

    const [cartList, setCartList] = useState();
    const [loggedIn, setLoggedIn] = useState()
    const [productValue, setProductValue] = useState()
    let loggIn = false
    



    const removeClickHandler = async (event) => {

    
        setLoggedIn(localStorage.userID)
        setProductValue(event.target.value)

    

        if (!localStorage.getItem("userID")) {
            navigate("https://main--celebrated-conkies-90de72.netlify.app/auth")
                      

        } else {
            try {
                await axios.post(`https://ecom-nwkh.onrender.com/removeRouter/${localStorage.userID}/${event.target.value}`)
            } catch (error) {
                console.log(error)
            }
        }




    }



    

    const navigate = useNavigate()
    useEffect(()=> {
        if (!localStorage.getItem("userID")) {
            window.location.replace('/auth')
    
    
        } else {
            try {
                axios.get(`https://ecom-nwkh.onrender.com/userDetail/${localStorage.userID}`).then((response) => {
                    setCartList(response.data)
                    
                    loggIn = true
    
                })
    
            } catch (error) {
                console.log(error)
            }
        }
    }, [cartList])

    

    return (

        <div 
        
        className="flex p-3 ">

            {cartList?.map((i) =>
            <>
                <div
                className=" w-3/4 place-content-center flex gap-3 border-2 p-2 rounded-2xl"
                key={i._id}
                >
                    
                    <div><img 
                    className=" w-32 "
                    src={require(`./images/${i.productImage}`)} />
                    </div>
                    <h3 
                    className=" text-lg font-semibold text-sky-600 flex-1 w-2/4" 
                    > <p className=" text-sky-800 " >Title</p>  {i.title}</h3>
                    
                    <h5 className=" text-lg font-semibold text-sky-600 flex-1 w-2/4"> <p className=" text-sky-800 " >Category</p> {i.category}</h5>
                    
                    <h6 className=" text-lg font-semibold text-sky-600 flex-1 w-2/4" > <p className=" text-sky-800 " >Price</p> {i.price}</h6>
                    <button 
                    value={i._id}
                    onClick={removeClickHandler}
                    className=" border-2 p-1 bg-red-500 text-white font-semibold " >Remove</button>
                </div>
                
                </>
            )}

        </div>


    )





}