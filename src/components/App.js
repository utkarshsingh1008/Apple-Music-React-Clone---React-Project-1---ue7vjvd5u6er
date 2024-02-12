import "../styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Login from "./form/Login";
import Signin from "./form/Signin";
import Home from "./form/Home";
function App() {
  axios.interceptors.request.use(async (config) => {
    config.headers['projectid'] = "ue7vjvd5u6er";
    return config;
  })
  return <div > 
  <BrowserRouter>
  <Header/>
   <Home/>
  <Routes>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/Signin" element={<Signin/>}/>
    </Routes></BrowserRouter>
      
  </div>;
 
}

export default App;
