import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserProvider";

function Library() {
  const { token } = useUser();
  const [list, setList] = useState([]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((song, index) => (
          <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
            <img
              src={song.thumbnail}
              alt="Thumbnail"
              className="w-full h-auto rounded-md"
            />
            <div className="mt-2 text-lg font-semibold">{song.title}</div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => deleteHandler(song._id)}
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
