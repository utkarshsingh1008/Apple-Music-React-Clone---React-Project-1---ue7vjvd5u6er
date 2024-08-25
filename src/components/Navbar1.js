import React, { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaVolumeUp,
  FaVolumeMute,
  FaApple,
} from "react-icons/fa";
import { IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Sidebar from "./Sidebar";
import { useUser } from "../providers/UserProvider";
import "./navbar1.css";
import { IoMusicalNotesSharp } from "react-icons/io5";
import signin from "../assets/signin.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import three from "../assets/three.svg";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const Navbar1 = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false); // New state for mute
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isClickPending, setIsClickPending] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { audioPlayerSong, setAudioPlayerSong, songId } = useUser();
  const audioPlayer = useRef(null);
  const progressBar = useRef(null);
  const animationRef = useRef(null);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setIsFavorited(false);
  }, [props]);

  useEffect(() => {
    if (songId) {
      setAudioPlayerSong((prevSong) => ({
        ...prevSong,
        song: songId,
      }));
    }
  }, [songId, setAudioPlayerSong]);

  const onClickHandlerFav = () => {
    if (!songId) {
      console.error("Invalid songId:", songId);
      alert("Invalid song ID. Cannot add to favorites.");
      return;
    }

    if (isClickPending) return;
    setIsClickPending(true);
    setTimeout(() => {
      setIsClickPending(false);
    }, 500);

    axios
      .patch(
        `https://academics.newtonschool.co/api/v1/music/favorites/like`,
        { songId: audioPlayerSong._id?audioPlayerSong._id:songId },
        {
          headers: {
            projectID: "cp0doe0u3fx9",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        Swal.fire({
          title: "Success",
          text: result.data.message,
          icon: "success",
          timer: 2000, // Auto close after 2 seconds
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setIsFavorited(!isFavorited);
      })
      .catch((error) => {
        console.error("Error adding to favorites:", error.response.data);
        Swal.fire({
          title: "Error",
          text: "Failed to add to favorites. Please try again.",
          icon: "error",
          timer: 2000, // Auto close after 2 seconds
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  };

  const logoutHandler = (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    event.preventDefault();
    navigate("/");
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleChangePassword = () => {
    navigate("/changepassword");
  };

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioPlayer.current && audioPlayerSong) {
      audioPlayer.current.src = audioPlayerSong.audio_url;
      audioPlayer.current.load();
      audioPlayer.current.onloadeddata = () => {
        setDuration(audioPlayer.current.duration);
        if (progressBar.current) {
          progressBar.current.max = audioPlayer.current.duration;
        }
        if (isPlaying) {
          audioPlayer.current.play();
        }
        togglePlayPause();
      };
    }
  }, [audioPlayerSong]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    if (progressBar.current) {
      progressBar.current.value = audioPlayer.current.currentTime;
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeRange = () => {
    if (audioPlayer.current && progressBar.current) {
      audioPlayer.current.currentTime = progressBar.current.value;
      changePlayerCurrentTime();
    }
  };

  const changePlayerCurrentTime = () => {
    if (progressBar.current) {
      progressBar.current.style.setProperty(
        "--seek-before-width",
        `${(progressBar.current.value / duration) * 100}%`
      );
      setCurrentTime(progressBar.current.value);
    }
  };

  const backThirty = () => {
    if (progressBar.current) {
      progressBar.current.value = Number(progressBar.current.value) - 30;
      changeRange();
    }
  };

  const forwardThirty = () => {
    if (progressBar.current) {
      progressBar.current.value = Number(progressBar.current.value) + 30;
      changeRange();
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    setIsMuted(event.target.value === "0"); // Automatically mute if volume is set to 0
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  return (
    <>
      <div
        className="navbar"
        style={{
          flexGrow: 1,
          position: "sticky",
          width: "98%",
          zIndex: "1",
          top: "0px",
        }}
      >
        <div className="drawer">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ m: 1 }}
          >
            <MenuIcon style={{ marginLeft: "-10px" }} />
          </IconButton>
        </div>

        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Sidebar onItemSelect={handleDrawerToggle} />
        </Drawer>
        <div className="music-control">
          <audio ref={audioPlayer} preload="metadata" ></audio>
          <button
            onClick={backThirty}
            className="icon"
            style={{
              border: "none",
              textDecoration: "none",
              background: "none",
            }}
          >
            <FaBackward color="lightgray" size="25px" />
          </button>
          <button
            className="icon"
            onClick={audioPlayerSong && togglePlayPause}
            style={{
              border: "none",
              textDecoration: "none",
              background: "none",
            }}
          >
            {isPlaying ? (
              <FaPause color="lightgray" size="25px" />
            ) : (
              <FaPlay color="lightgray" size="25px" />
            )}
          </button>
          <button
            onClick={forwardThirty}
            className="icon"
            style={{
              border: "none",
              textDecoration: "none",
              background: "none",
            }}
          >
            <FaForward color="lightgray" size="25px" />
          </button>
        </div>

        <div className="nav-controls">
          <div className="logs" style={{ height: "50px" }}>
            <div
              className="logos"
              style={{
                border: "1px solid gray",
                backgroundColor: "lightgray",
                height: "50px",
                width: "50px",
              }}
            >
              {audioPlayerSong?.thumbnail ? (
                <img
                  src={audioPlayerSong.thumbnail}
                  alt="thumbnail"
                  style={{ width: "50px" }}
                />
              ) : (
                <IoMusicalNotesSharp size={30} className="music-icon" />
              )}
            </div>
            {isPlaying && audioPlayerSong ? (
              <div
                className="timestap"
                style={{
                  display: "flex",
                  marginLeft: "20px",
                  alignItems: "center",
                }}
              >
                <div className="duration">{calculateTime(currentTime)}</div>
                <div>
                  <input
                    type="range"
                    defaultValue="0"
                    ref={progressBar}
                    onChange={changeRange}
                    style={{
                      margin: "0 10px",
                      WebkitAppearance: "none",
                      appearance: "none",
                      background: "gray",
                      height: "6px",
                      borderRadius: "5px",
                      outline: "none",
                      opacity: "0.7",
                      transition: "opacity .2s",
                    }}
                    className="responsive-range"
                  />
                </div>
                <div className="duration">
                  {duration && !isNaN(duration) && calculateTime(duration)}
                </div>
              </div>
            ) : (
              <div className="icon-container">
                <FaApple size={30} color="gray" className="custom-icon" />
              </div>
            )}
          </div>

          <button
            style={{
              fontSize: "12px",
              width: "40px",
              height: "40px",
              marginTop: "0px",
              marginLeft: "0px",
              border: "none",
              textDecoration: "none",
              background: "none",
            }}
            onClick={(e) => { 
              onClickHandlerFav();
              if (isFavorited && typeof otherCode !== 'function') {
  window.location.reload();
}

              e.preventDefault();
             
            }}
          >
            {localStorage.getItem("token") && audioPlayerSong ? (
              <FavoriteIcon
                style={{
                  color: isFavorited ? "red" : "white",
                  fontSize: isFavorited ? "42px" : "30px",
                }}
              />
            ) : (
              ""
            )}
          </button>

          <div className="volume-control" style={{ marginRight: "25px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={toggleMute}
                style={{ background: "none", border: "none" }}
              >
                {isMuted ? (
                  <FaVolumeMute style={{ marginRight: "5px" }} />
                ) : (
                  <FaVolumeUp style={{ marginRight: "5px" }} />
                )}
              </button>
              <input
                type="range"
                id="volume"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>

        <div className="nav-login">
          <Button onClick={handleOpen}>
            <div>
              {localStorage.getItem("token") ? (
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "blue",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                  }}
                >
                  {localStorage.getItem("name") &&
                    localStorage.getItem("name")[0]}
                </div>
              ) : (
                <div style={{  width: "100px",
                  borderRadius: "50%",
                  backgroundColor: "#f9f9f9",
                  marginRight: "5px"
                 }}>User Profile</div> 
              )}
            </div>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ marginLeft: "85%", marginTop: "-390px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems:'center',
                justifyContent:"center",

                width: "200px",
                height: "150px",
                backgroundColor: "lightyellow",
                borderRadius: "10px",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-30px",
                transform: "translate(-50%, -50%)",
              }}
            >
              {!localStorage.getItem("token") ? (
                <button onClick={()=>{handleLogin();handleClose()}} 
                style={{fontSize:'18px',backgroundColor:'pink',
                color:'white',borderRadius:'5px',fontWeight:'600',
                width:'150px'}}>Sign In</button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "baseline",
                    gap: "10px",
                    backgroundColor: "lightyellow",
                  }}
                >
                  <button
                    style={{
                      textDecoration: "none",
                      borderRadius: "6px",
                      color: "black",
                      border: "none",
                      backgroundColor: "lightyellow",
                    }}
                  >
                    {localStorage.getItem("name").toUpperCase()}
                  </button>
                  <button
                    style={{
                      borderRadius: "6px",
                      color: "black",
                      border: "none",
                      textDecoration: "none",
                      backgroundColor: "lightyellow",
                    }}
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>

                  <button
                    style={{
                      textDecoration: "none",
                      borderRadius: "6px",
                      color: "black",
                      border: "none",
                      backgroundColor: "lightyellow",
                    }}
                    onClick={logoutHandler}
                  >
                    {/* <img src={signin} alt="" style={{ marginRight: '4px' }} /> */}
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Navbar1;