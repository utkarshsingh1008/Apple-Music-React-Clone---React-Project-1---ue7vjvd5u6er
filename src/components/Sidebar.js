import React from 'react'
import { PiBrowsersThin } from "react-icons/pi";
import { FaApple } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Sidebar() {
  return (
    <div>
           <div className="bg-gray-100  ">
          <div className="mt-8 ">
            <span className="text-2xl font-bold text-black m-4 p-8">
              <FaApple className="p-1 text-4xl" style={{ display: "inline" }} />{" "}
              Music
            </span>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 mr-8 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 ml-8 mt-4 w-30%"
          />
          <li className="text-1xl text-gray-400 ml-8 m-3 hover:bg-gray-300 p-2 rounded">
          <Link to="/">
            <FaPlay style={{ color: "red", display: "inline" }} /> Listen Now
          </Link>
        </li>
        <li className="text-1xl text-gray-400 ml-8 hover:bg-gray-300 p-2 rounded">
          <Link to="/library">
            <PiBrowsersThin style={{ color: "red", display: "inline" }} /> Browser
          </Link>
        </li>
        
        </div>
    </div>
  )
}

export default Sidebar
