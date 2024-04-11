
function Musiccard(props) {
  const { thumbnail, id,onMusicHandler } = props;

  return (
    <div style={{ flex: "0 0 calc(33.33% - 16px)", maxWidth: "calc(33.33% - 16px)", boxSizing: "border-box", marginBottom: "16px" }}>
      <img onClick={()=>onMusicHandler(id)} style={{ width: "100%", height: "auto", borderRadius: "8px" }} src={thumbnail} alt="Thumbnail" />
      
    </div>
  );
}

export default Musiccard;
