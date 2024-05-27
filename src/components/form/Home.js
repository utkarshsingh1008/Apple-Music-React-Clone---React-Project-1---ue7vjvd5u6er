import axios from "axios";
import { useEffect, useState } from "react";
import Musiccard from "../Musiccard";

import { useUser } from "../../context/UserProvider";


function Home() {
  const [list, setList] = useState([]);
  const [music, setMusic] = useState(null);
  const { setAudioPlayer } = useUser();
  const {search} = useUser();
  const listOfSong = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song")
      .then((res) => {
        console.log(res);
        setList(res.data.data);
        console.log(setList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    listOfSong();
  }, []);

  const onMusicHandler = (index) => {
    debugger;
    console.log(index);
    let musiclist = list[index];
     console.log(list[index])
    setMusic(musiclist);
    setAudioPlayer(musiclist);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        marginLeft: "29px",
        marginTop: "90px",
        
      }}
    >
     {search?.length <= 0 ? (
  list.map((obj, index) => (
    <Musiccard
      key={index}
      title={obj.title}
      thumbnail={obj.thumbnail}
      artist={obj.artist}
      id={index}
      onMusicHandler={onMusicHandler}
    />
  
  ))
) : (
  search!=null ? (
    search?.map((obj, index) => (
      <Musiccard
        key={index}
        title={obj.title}
        thumbnail={obj.thumbnail}
        artist={obj.artist}
        id={index}
        onMusicHandler={onMusicHandler}
      />
    ))
  ):(<div className ='m-48'> No Songs Found...</div>)
)}
   
    </div>
  );
}

export default Home;
