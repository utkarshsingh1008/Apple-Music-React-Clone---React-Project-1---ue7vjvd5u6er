import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserProvider";
import Musiccard from "./Musiccard";
function Library() {
  const { token } = useUser();
  const [list, setList] = useState([]);
  
  const {setAudioPlayer} = useUser();
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "https://academics.newtonschool.co/api/v1/music/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setList(response.data.data.songs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorites();
  }, [token]);
 
  const onMusicHandler = (index) => {
    debugger;
    console.log(index);
    let musiclist = list[index];
    
    setAudioPlayer(musiclist);
  };

  const deleteHandler = (songId) => {
    axios
      .patch(
        "https://academics.newtonschool.co/api/v1/music/favorites/unlike",
        { songId: songId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        // Remove the deleted song from the list
        setList((prevList) =>
          prevList.filter((song) => song._id !== songId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {list.map((obj, index) => (
          <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
                    <Musiccard
      key={index}
      title={obj.title}
      thumbnail={obj.thumbnail}
      artist={obj.artist}
      id={index}
      onMusicHandler={onMusicHandler}
    />
     
            <div className="mt-2 text-lg font-semibold">{obj.title}</div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => deleteHandler(obj._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
