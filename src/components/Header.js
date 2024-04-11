import React from "react";
import { Link } from 'react-router-dom';
import { FaApple } from "react-icons/fa";
import { CiMusicNote1 } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoPlayBack } from "react-icons/io5";
import { IoPlayForward } from "react-icons/io5";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { useUser } from "../context/UserProvider";
function Header() {

 const {token, name,onTokenHandeler,onNameHandeler} = useUser();
  
 const onLogoytHandler = ()=>{
    onTokenHandeler(null);
    onNameHandeler(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
 }
  const [value, setValue] = React.useState(30);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div> 
      <nav className="flex">
   

        <div className="ml-4 md:ml-20 mt-6 w-full h-30 ">
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
      
 <Box sx={{ marginTop:"18px", width: 140 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">

      <VolumeUp />
        <Slider disabled defaultValue={30} aria-label="Disabled slider" />
        {/* <Slider aria-label="Volume" value={value} onChange={handleChange} /> */}
       
      </Stack>
       
    </Box>
   {!token && <Link to="/signin"><button className="m-4 px-6  bg-red-500 text-white rounded-md">
              Login
            </button></Link> }
          { token &&  <Link to="/login"><button onClick={onLogoytHandler} className="m-4 px-6  bg-red-500 text-white rounded-md">
             Logout
            </button></Link>} 
          </div>
        </div>

      </nav>
    </div>
  );
}

export default Header;
