import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"

export const Auth = () => {
    return (

        <div className="grid grid-row-2 place-content-center">

            <div className="grid justify-center p-10 border-2 m-5 rounded-2xl">
                <Login />
            </div>

            <div className="grid justify-center p-10 border-2 m-5 rounded-2xl">
                <Register />
            </div>



        </div>


    )
}


const Login = () => {


    const [inputs, setInput] = useState({
        'username': "",
        'password': ""
    })

    const inputHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInput((prev) => {
            prev[name] = value;
            return prev
        })
        

    }

    const [ _, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()


    const submitHandler = async(event) => {
        event.preventDefault()
        try {
            const result = await axios.post("/auth/login", {
                username: inputs.username,
                password: inputs.password
            })

            alert("Login Success")
            console.log(result)
             setCookies("access_token", result.data.token);
             window.localStorage.setItem("userID", result.data.userID);
             window.location.replace('https://main--celebrated-conkies-90de72.netlify.app/');

        } 
        catch (error) {
            console.log(error)
            

        }

    }




    return (



        <div className="grid justify-center p-10 border-2 m-5 rounded-2xl">
            <h2 className=" text-blue-500 text-2xl font-bold">
                Login
            </h2>
            <form onSubmit={submitHandler} className="grid justify-center">

                <input
                    onChange={inputHandler}
                    name='username'
                    className="mt-2 p-1 border-2 rounded-md"
                    type="text"
                    placeholder="username" />

                <input
                    onChange={inputHandler}
                    name='password'
                    className="mt-2 p-1 border-2 rounded-md"
                    type="text"
                    placeholder="password" />
                <button
                    className="border-2 text-white font-semibold p-1 hover:bg-white hover:text-blue-500 border-blue-500 mt-2 rounded-lg bg-blue-600"
                    type="submit">
                    Login
                </button>


            </form>
        </div>





    )



}


const Register = () => {


    const [inputs, setInput] = useState({
        'username': "",
        'password': ""
    })

    const inputHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInput((prev) => {
            prev[name] = value;
            return prev
        })
        console.log(inputs)

    }

    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            await axios.post("http://localhost:5000/auth/register", {
                username: inputs.username,
                password: inputs.password
            })

            alert("Registration is Successful, Please Login!")
        } catch (error) {
            console.log(error)
            alert("Username already exists")

        }

    }




    return (


        <div className="grid justify-center p-10 border-2 m-5 rounded-2xl">
            <h2 className=" text-blue-500 text-2xl font-bold">
                Register
            </h2>
            <form onSubmit={submitHandler} className="grid justify-center" >

                <input
                    onChange={inputHandler}
                    name="username"
                    className="mt-2 p-1 border-2 rounded-md"
                    type="text"
                    placeholder="username" />

                <input
                    onChange={inputHandler}
                    name="password"
                    className="mt-2 p-1 border-2 rounded-md"
                    type="text"
                    placeholder="password" />
                <button
                enctype="multipart/formdata"
                    className="border-2 text-white font-semibold p-1 hover:bg-white hover:text-blue-500 border-blue-500 mt-2 rounded-lg bg-blue-600"
                    type="submit">
                    Register</button>


            </form>
        </div>



    )



}