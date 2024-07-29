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
        className="flex fixed w-full top-0 left-0 bg-white z-50"
        style={{
          top: "-24px",
        }}
      >
        <div className="sm:ml-72 mt-6 w-3/4 h-28">
          <div className="bg-white border border-gray-300 flex justify-between text-gray-400 p-4">
            <div className="flex items-center">
              <CiMusicNote1 className="text-4xl mr-4" />
              <FaApple className="text-4xl" />
            </div>
            <div className="flex-grow flex justify-center items-center">
              <Musicplayer
                thumbnail={audioPlayer?.thumbnail}
                audio_url={audioPlayer?.audio_url}
                songId={audioPlayer?._id}
              />
            </div>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                marginTop: "18px",
                width: 140,
              }}
            >
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              ></Stack>
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
