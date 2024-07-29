import React, { useRef } from 'react';

const H5AudioPlayer = (props) => {
    const { title, thumbnail, audio_url, songId } = props;
  const audioRef = useRef(null);

  const playPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const stop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div>
      <audio ref={audioRef} controls>
        <source src={audio_url} type="mp3" />
      </audio>
      <img
        src={thumbnail}
        height={"50"}
        width={"50"}
        className="bannerImg"
        alt=""
      />
       <div className="music-title">{title}</div>
      <div>
        <button onClick={playPause}>Play/Pause</button>
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
};

export default H5AudioPlayer;
