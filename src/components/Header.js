import React from "react"; // Add this import statement

import { Link } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import Slider from "@mui/material/Slider";

import { CiMusicNote1 } from "react-icons/ci";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useUser } from "../context/UserProvider";
import Musicplayer from "./Musicplayer";

function Header() {
  const { token, onTokenHandeler, onNameHandeler, audioPlayer } = useUser();

  const onLogoytHandler = () => {
    onTokenHandeler(null);
    onNameHandeler(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
  };

  

  return (
    <div>
      <nav
        className="flex fixed"
        style={{
          width: "86%",
          top: "-24px",
          left: "14%",
        }}
      >
        <div className="ml-4 md:ml-20 mt-6 w-full">
      
          <div className="bg-white border border-gray-300 flex justify-between text-gray-400" style={{height:"75px"}}>
            <div
              className="flex m-4 "
              
            >
            </div>
     <div >      <Musicplayer
                
                thumbnail={audioPlayer?.thumbnail}
                audio_url={audioPlayer?.audio_url}
                songId={audioPlayer?._id}
              /></div>
            <div className="m-2 border border-gray-400 w-full md:w-1/2 md:ml-4 p-2 flex justify-between text-gray-400">
              <CiMusicNote1 className="text-4xl" />
              <FaApple className="text-4xl" />
              <div></div>
            </div>

            <Box sx={{ marginTop: "18px", width: 140 }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
               
              </Stack>
            </Box>

            {!token && (
              <Link to="/signin">
                <button className="m-4 px-6 bg-red-500 text-white rounded-md">
                  Signin
                </button>
              </Link>
            )}

            {token && (
              <Link to="/login">
                <button
                  onClick={onLogoytHandler}
                  className="m-4 px-6 bg-red-500 text-white rounded-md"
                >
                  Logout
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
