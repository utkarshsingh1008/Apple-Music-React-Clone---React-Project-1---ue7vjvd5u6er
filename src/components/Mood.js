import { useState,useEffect } from "react"
import axios from "axios"
import { useUser } from "../context/UserProvider";
import Musiccard from "./Musiccard";


function Mood() {

  const [datas, setData] = useState([]);
  const [music, setMusic] = useState(null);
  const { setAudioPlayer } = useUser();

  const onMusicHandler = (index) => {
      debugger;
      console.log(index);
      let musiclist = datas[index];
      setMusic(musiclist);
      setAudioPlayer(musiclist);
    };

 
    const fetchMood = (input)=>{
      const queryString = {
        mood: input
      } 
      try{
        axios.get("https://academics.newtonschool.co/api/v1/music/song",{ params: { filter: JSON.stringify(queryString)}}).
        then((res)=>{
       setData(res.data.data)
        }) .catch((err) => {
          console.log(err);
      });
      }
     catch(error){
       console.log(error)
     }
    }

  
  useEffect(() => {
    fetchMood("sad");
  }, []);

  return (
    <div className="m-28">
    <div> <button onClick={()=>fetchMood("sad")}>Mood Romantic </button>
     <button onClick={()=>fetchMood("romantic")}> Mood Sad </button>
     <button onClick={()=>fetchMood("happy")}>Mood Happy </button>
     </div>
     <div  style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginLeft: "29px",
            marginTop: "90px",
            
          }} className="flex justify-center gap-10 m-28">
          

            {datas.map((obj, index) => (
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

  )
}

export default Mood
