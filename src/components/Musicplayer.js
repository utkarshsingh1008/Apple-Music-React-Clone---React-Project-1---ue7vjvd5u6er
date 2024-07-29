import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useUser } from "../providers/UserProvider";
import ReactH5AudioPlayer from "react-h5-audio-player";
import { FaVolumeDown, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';
import applelogo from '../assets/applelogo.svg'
import './musicplayer.css'

const MusicPlayer = (props) => {
  const { title, thumbnail, audio_url, songId } = props;
  const { getToken } = useUser();
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const [isClickPending, setIsClickPending] = useState(false); // Add state for debounce
  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    setIsFavorited(false);
  }, [props]);

  const onClickHandler = (songId) => {
    if (isClickPending) return; // Debounce: if a click is pending, don't proceed
    setIsClickPending(true); // Set click pending
    setTimeout(() => {
      setIsClickPending(false); // Reset click pending after delay
    }, 500); // Adjust delay as needed

    axios
      .patch(
        "https://academics.newtonschool.co/api/v1/music/favorites/like",
        { songId: songId },
        {
          headers: {
            projectID: "f104bi07c490",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        alert(result.data.message);
        setIsFavorited(true);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="music-player" >
      <ReactH5AudioPlayer
        ref={audioRef}
        src={audio_url}
        autoPlayAfterSrcChange={false}
        volume={volume}
        style={{ background: "lightgray", border: "none" }}
      />
      <div
        className="image-title"
        style={{
          gap: "10px",
          justifyContent: "center",
          marginLeft: "-172px",
          marginTop:"-2%"
        }}
      >
        <img
          src={thumbnail || applelogo}
          height={"50"}
          width={"50"}
          className="bannerImg"
          alt=""
          style={{ marginTop: "17px", marginLeft: "-320%" }}
        />
      </div>

      <div className="nav-control">
        <div>
          <span
            style={{ fontSize: "12px", width: "130px", marginTop: "10px", marginLeft:'360%' }}
            onClick={(e) => {e.preventDefault(); onClickHandler(songId);}}
          >
            {localStorage.getItem("token")&&  <FavoriteIcon style={{ color: isFavorited ? 'red' : 'white', fontSize: isFavorited ? '42px' : '30px' }} />}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
