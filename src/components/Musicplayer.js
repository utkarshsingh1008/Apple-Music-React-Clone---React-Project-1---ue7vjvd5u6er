import { useUser } from "../context/UserProvider";
import { FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function Musicplayer(props) {
  const { thumbnail, audio_url, songId } = props;
  const { token } = useUser();
  const [watchList, setWatchlist] = useState(false);
   
  useEffect(() => {
    setWatchlist(false);
  }, [props])

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
        // Handle error here
      });
  };

  return (
    <div 
    
      style={{
        flex: "0 0 calc(33.33% - 16px)",
        maxWidth: "calc(33.33% - 16px)",
        boxSizing: "border-box",
        marginBottom: "10px",
      
      }}
    ><div className="flex gap-4" >
     <div> <H5AudioPlayer style={{height:"60px"}}
        src={audio_url}
        autoPlayAfterSrcChange={false}
      /> </div>
   <div>  <img
        style={{ width: "100%", height: "35px", borderRadius: "2px", margin:"5px"}}
        src={thumbnail}
        alt="Thumbnail"
      />

{token && ( 
        <FaRegHeart 
          className={`text-xl cursor-pointer transition-colors duration-300 ${
            watchList ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
          onClick={() => handleFavoriteClick(songId)} 
        />
      )}
   </div></div></div>
  );
}

export default Musicplayer;
