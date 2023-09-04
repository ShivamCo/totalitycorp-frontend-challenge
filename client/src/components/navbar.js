import { Link } from "react-router-dom";
import logo from "../../src/logo.png"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {

  const [ cookies, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()


  const logout = () => {

    setCookies("access_token", "");
    window.localStorage.removeItem("userID")
    navigate("/auth")

  }


  return (

   


<nav className="bg-white shadow dark:bg-gray-800 h-30  ">
    <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Link to="/" className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">Products</Link>

        <Link to="/Checkout" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Checkout</Link>

{ !cookies.access_token 
?
        
         <Link to="/auth" className=" border-b-2 border-transparent border-2 p-1 pr-2 pl-2 rounded-lg border-blue-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6 ">
         Login
        </Link> 

        :
        <>
        <button 
        className="grid grid-flow-col gap-1 border-2 p-1 pr-2 pl-2 mr-1 rounded-lg"
        value="addProduct" 
        onClick={(e)=>{if(e.target.value == "addProduct") {
          window.location.replace('http://localhost:3000/add-products')
        }}}>Add Products</button>
        <div className="grid grid-flow-col gap-1 border-2 p-1 pr-2 pl-2 rounded-lg" >
        <img className="w-7 h-7 fill-current rounded-full"  src="https://www.w3.org/thumbnails/200/avatar-images/7mtpjeh4in8kw04ksso8ss4ocsksswo.webp"></img>
        <button onClick={logout}>Logout</button>
        </div>
        
        </>
        }
    </div>
</nav>



  )










}
