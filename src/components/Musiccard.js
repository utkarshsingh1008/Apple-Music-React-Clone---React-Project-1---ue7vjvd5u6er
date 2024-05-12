import { useUser } from "../context/UserProvider";

function Musiccard(props) {
  const { thumbnail, id, onMusicHandler } = props;
  // const [setSongId] = useUser();
  // setSongId();
  return (
    <div
      style={{
        flex: "0 0 calc(20% - 16px)",
        maxWidth: "calc(20% - 16px)",
        maxHeight:"65%",
        boxSizing: "border-box",
        marginBottom: "16px",
      }}
    >
      <img
        onClick={() => onMusicHandler(id)}
         style={{height:"80%"}}
        src={thumbnail}
        alt="Thumbnail"
      />
    </div>
  );
}

export default Musiccard;
