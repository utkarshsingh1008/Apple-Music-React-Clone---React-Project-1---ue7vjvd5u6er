import { useUser } from "../context/UserProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import Musiccard from "./Musiccard";

function Album() {
    
    const [album, setAlbum] = useState([]);
    const [music, setMusic] = useState(null);
    const { setAudioPlayer } = useUser();

    const onMusicHandler = (index) => {
        debugger;
        console.log(index);
        let musiclist = album[index];
        setMusic(musiclist);
        setAudioPlayer(musiclist);
      };

      
    const onFilterHandler = (input) => {
        const queryString = {
            featured: input
        };
        axios.get("https://academics.newtonschool.co/api/v1/music/song", { params: { filter: JSON.stringify(queryString) } })
            .then((res) => {
                setAlbum(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

     useEffect(()=>{
        onFilterHandler("Trending songs");
     },[])


    return  (
        <div >
            <div className="m-32 flex gap-32">
          <button onClick={() => onFilterHandler("Trending songs")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Trending Song
            </button>
            <button onClick={() => onFilterHandler("Top 50 of this month")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Top 50 of this month
            </button>
            <button onClick={() => onFilterHandler("Top 20 of this week")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Top 20 of this month
            </button> </div>
        <div  style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginLeft: "29px",
            marginTop: "90px",
            
          }} className="flex justify-center gap-4 m-28">
          

            {album.map((obj, index) => (
    <Musiccard
      key={index}
      title={obj.title}
      thumbnail={obj.thumbnail}
      artist={obj.artist}
      id={index}
      onMusicHandler={onMusicHandler}
    />
  
  ))}
        </div></div>
    );
}

export default Album;
