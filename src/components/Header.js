import React from "react";
import { Link } from 'react-router-dom';
import { FaApple } from "react-icons/fa";
import { CiMusicNote1 } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoPlayBack } from "react-icons/io5";
import { IoPlayForward } from "react-icons/io5";
import { PiBrowsersThin } from "react-icons/pi";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';

function Header() {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div> 
      <nav className="flex">
        <div className="bg-gray-100 h-screen ">
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
          <div className="text-1xl text-gray-400 ml-8 m-3 hover:bg-gray-300 p-2 rounded">
            <FaPlay style={{ color: "red", display: "inline" }} /> Listen Now
          </div>
          <div className="text-1xl text-gray-400 ml-8 hover:bg-gray-300 p-2 rounded">
            <PiBrowsersThin style={{ color: "red", display: "inline" }} />{" "}
            Browser
          </div>
        </div>

        <div className="ml-4 md:ml-20 mt-6 w-full ">
          <div className="bg-white border border-gray-300 flex justify-between text-gray-400">
            <div className="flex m-4">
              <IoPlayBack className="m-2" />
              <FaPlay className="m-2" />
              <IoPlayForward className="m-2" />
            </div>

            <div className="m-2 border border-gray-400 w-full md:w-1/2 md:ml-4 p-2 flex justify-between text-gray-400">
              <CiMusicNote1 className="text-4xl" />
              <FaApple className="text-4xl" />
              <div></div>
            </div>
      

{/* <input
    type="range"
    id="volume"
    name="volume"
    min="0"
    max="1"
    className="mr-16 w-16 bg-black text-gray-600"
  /> */}
 <Box sx={{ marginTop:"18px", width: 140 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">

      <VolumeUp />
        <Slider disabled defaultValue={30} aria-label="Disabled slider" />
        {/* <Slider aria-label="Volume" value={value} onChange={handleChange} /> */}
       
      </Stack>
       
    </Box>
    <Link to="/login"><button className="m-4 px-6  bg-red-500 text-white rounded-md">
              Signin
            </button></Link> 
          </div>
        </div>

      </nav>
    </div>
  );
}

export default Header;
