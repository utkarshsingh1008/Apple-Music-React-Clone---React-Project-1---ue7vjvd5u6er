
import { FaApple } from "react-icons/fa";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { useUser } from "../../context/UserProvider";
//  import { Login } from "@mui/icons-material";

function Login() {
   const {onTokenHandeler, onNameHandeler}= useUser()
  const[error, setError] = useState();
  const [data, setData] = useState({
    appType:'music',
    email:'',
    password:'',
  
  });

  const navigate = useNavigate();
  const onchangeHandeler = (event)=>{
    setData({...data,[event.target.name]: event.target.value})
  }
 const onsubmitHandeler = (event)=>{
   event.preventDefault();
  
  axios.post("https://academics.newtonschool.co/api/v1/user/login",data).then((responce)=>{
    console.log(responce);
    onTokenHandeler(responce.data.token)
    onNameHandeler(responce.data.data.name)
    navigate("/")
  }).catch((error)=>{
    console.log(error);
    if(error.response  && error.response.data.message){
      setError(error.response.data.message)
    } else{
      setError("Unknown error")
    }
  })
 }

  return (
    <div  className="flex flex-col items-center justify-center h-screen">
      <button className=" bg-gray-100 text-2xl mr-96 text-gray-600 border rounded-full px-4 py-2  hover:bg-gray-300">
        X
      </button>
      <FaApple className=" text-gray-500 text-4xl mb-4" />
      <h1 className="text-2xl font-bold mb-2">Sign In or Sign Up</h1>
      <p className="text-gray-600 mb-4">Enter your email to get started.</p>
      <input
        value={data.email}
        onChange={onchangeHandeler}
        type="text"
        name="email"
        placeholder="Email or Apple ID"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full max-w-md"
      />
      <input
        value={data.password}
        onChange={onchangeHandeler}
        type="password"
        name="password"
        placeholder="Password"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full max-w-md"
      />
       
      <p className="text-blue-500 text-sm mb-4">Forgot Apple ID or Password?</p>
      <p className="text-gray-400 mb-4 w-1/2">
        Your Apple ID information is used to allow you to sign in securely and
        access your data. Apple records certain data for security, support, and
        reporting purposes. If you agree, Apple may also use your Apple ID
        information to send you marketing emails and communications, including
        based on your use of Apple services.
      </p>
      <form onSubmit={onsubmitHandeler}>
   {/* ... your input fields */}
   <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-md">
      Continue
   </button>
</form>
<h1 style={{margin:"20px", color:"red"}}>{error}</h1>
    </div>
  );
}

export default Login;
