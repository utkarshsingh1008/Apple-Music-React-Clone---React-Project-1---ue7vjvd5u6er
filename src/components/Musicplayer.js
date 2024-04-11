import { useUser } from "../context/UserProvider";
import { FaRegHeart } from "react-icons/fa";
import { useState,useEffect } from "react";
import axios from "axios";

function Musicplayer(props) {
  const { thumbnail, audio_url, songId } = props;
  const { token } = useUser();
  const [watchList, setWatchlist] = useState(false);
   
  useEffect(()=>{
    setWatchlist(false);
 },[props])

  const handleFavoriteClick = (songId) => {
    axios
      .patch(
        'https://academics.newtonschool.co/api/v1/music/favorites/like',
        { songId: songId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((result) => {
        console.log(result);
        setWatchlist(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        flex: "0 0 calc(33.33% - 16px)",
        maxWidth: "calc(33.33% - 16px)",
        boxSizing: "border-box",
        marginBottom: "16px"
      }}
    >
      <audio controls src={audio_url} />
      <img
        style={{ width: "30%", height: "25px", borderRadius: "8px" }}
        src={thumbnail}
        alt="Thumbnail"
      />

      {token && !watchList && (
        <FaRegHeart onClick={() => handleFavoriteClick(songId)} />
      )}
      {token && watchList && <FaRegHeart className="text-red-500" />}
    </div>
  );
}

export default Musicplayer;
