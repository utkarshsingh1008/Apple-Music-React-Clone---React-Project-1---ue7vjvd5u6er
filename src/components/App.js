import "../styles/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Login from "./form/Login";
import Signin from "./form/Signin";
import Sidebar from "./Sidebar";
import Home from "./form/Home";
import Library from "./Library";
import { useUser } from "../context/UserProvider";

function App() {
  const { token } = useUser();

  function ProtectedRout({ children }) {
    if (token) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }

  axios.interceptors.request.use(async (config) => {
    config.headers["projectid"] = "ue7vjvd5u6er";
    return config;
  });
  return (
    <div className="main flex">
      <BrowserRouter>
        <div className="left ">
          <Sidebar />
        </div>
        <div className="right ">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signin" element={<Signin />} />
            <Route
              path="/Library"
              element={
                <ProtectedRout>
                  <Library />
                </ProtectedRout>
              }
            />
          </Routes>{" "}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
