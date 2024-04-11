import axios from "axios";
import { useEffect, useState } from "react";
import Musiccard from "../Musiccard";
import Musicplayer from "../Musicplayer";

function Home() {
  const [list, setList] = useState([]);
  const [music, setMusic] = useState(null);

  const listOfSong = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song")
      .then((res) => {
        console.log(res);
        setList(res.data.data);
        console.log(list);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    listOfSong();
    
  }, []);

  const onMusicHandler=(index)=> {
    debugger;
    console.log(index);
    let musiclist = list[index];
    setMusic(musiclist);
  }

 

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        marginLeft: "29px",
        marginTop: "30px",
        marginBottom: "44",
      }}
    >
      {list.map((obj, index) => (
        <Musiccard
          key={index}
          title={obj.title}
          thumbnail={obj.thumbnail}
          artist={obj.artist}
          id={index}
          onMusicHandler={onMusicHandler}
        />
      ))}

      {music && (
        <Musicplayer
          thumbnail={music.thumbnail}
          audio_url={music.audio_url}
          songId={music._id}
        />
      )}
    </div>
  );
}

export default Home;
