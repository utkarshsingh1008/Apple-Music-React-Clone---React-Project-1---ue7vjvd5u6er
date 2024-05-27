import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Musiccard from "./Musiccard";
import {  useNavigate } from "react-router-dom";
import Artistsong from "./Artistsong";
import { useUser } from "../context/UserProvider";
function Artist() {
  const [artist, setArtist] = useState([]);
  const navigate = useNavigate();
   
  const [song, setSong] = useState()
  const {setSongId}=useUser()
  function artistSong() {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/artist")
      .then((res) => {
        setArtist(res.data.data);
      
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    artistSong();
  }, []);

  const onMusicHandler = (index) => {
    console.log(index);
    clickArtist(artist[index]._id);
  };

 const clickArtist =(songId)=>{
     axios.get(`https://academics.newtonschool.co/api/v1/music/artist/${songId}`).then((res)=>{
      setSong(res.data.data)
      setSongId(res.data.data.songs)
      console.log(res.data.data.songs)
      navigate(`/artistSong/${songId}`)
      console.log(res.data.data)
     }).catch((error)=>{
      console.log(error);
     })
    
 }

  return (
    <div
    >
       <div  style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginLeft: "29px",
            marginTop: "90px",
            
          }} className="flex justify-center gap-4 m-28">
      {artist.map((obj, index) => (
        <Musiccard
        key={index}
        thumbnail={obj.image}
        artist={obj.artist}
        songid={obj._id}
        id={index}
        onMusicHandler={onMusicHandler}
      />
        
      ))}
    </div></div>
  );
}

export default Artist;
