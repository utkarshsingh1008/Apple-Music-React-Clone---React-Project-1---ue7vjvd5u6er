import { useUser } from "../context/UserProvider";

function Artistsong() {
  const { songId, setAudioPlayer } = useUser();

  const onMusicHandler = (song) => {
    setAudioPlayer(song);
  };

  return (
    <div className="mt-24 ml-32 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Songs</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-5 px-8 bg-gray-100 border-b">Thumbnail</th>
                <th className="py-5 px-8 bg-gray-100 border-b">Title</th>
                <th className="py-5 px-8 bg-gray-100 border-b">Release Date</th>
                <th className="py-5 px-8 bg-gray-100 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {songId && songId.map((obj, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-6 px-16">
                    <img src={obj.thumbnail} alt={`Thumbnail of ${obj.title}`} className="w-18 h-14 object-cover rounded" />
                  </td>
                  <td className="py-5 px-16">{obj.title}</td>
                  <td className="py-5 px-16">{new Date(obj.createdAt).toLocaleDateString()}</td>
                  <td className="py-5 px-16">
                    <button
                      onClick={() => onMusicHandler(obj)}
                      className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                    >
                      Play
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Artistsong;
