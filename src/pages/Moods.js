import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Box, Grid } from '@mui/material';
import MusicCard from '../components/Musiccard';
import { useUser } from '../providers/UserProvider';
import '../App.css';

function Moods() {
  const [getData, setData] = useState([]);
  const [typeMood, setTypeMood] = useState('happy'); // corrected variable name
  const [filterSongs, setFilterSongs] = useState([]);
  const { setAudioPlayerSong ,setSongId} = useUser();
  useEffect(() => {
    // Fetch happy songs when the component mounts
    onFilterSelection("happy");
  }, []);
  const onFilterSelection = async (input) => {
    setTypeMood(input); // corrected variable name
    let url;
    switch (input) {
      case 'happy':
        url = 'https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"happy"}';
        break;
      case 'sad':
        url = 'https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"sad"}';
        break;
      case 'excited':
        url = 'https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"excited"}';
        break;
      case 'romantic':
        url = 'https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"romantic"}';
        break;
      default:
        break;
    }
    try {
      const response = await axios.get(url, {
        headers: {
          projectId: 'f104bi07c490',
        },
      });
      setFilterSongs(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onMusicHandler = (index) => {
    let list = getData[index];
    setAudioPlayerSong(list);
    setSongId(list._id);
  };

  return (
    <>
      <Typography variant="h3" sx={{ marginLeft: '30px' }}>Moods</Typography>
      <Box sx={{ display: 'flex', gap: '8px', marginLeft: '30px', marginTop: '20px' }}>
        <Button variant="contained" style={{ backgroundColor: typeMood === "happy" ? "lightgreen" : "" }} onClick={() => onFilterSelection("happy")}>Happy Songs</Button>
        <Button variant="contained" style={{ backgroundColor: typeMood === "sad" ? "lightgreen" : "" }} onClick={() => onFilterSelection("sad")}>Sad Songs</Button>
        <Button variant="contained" style={{ backgroundColor: typeMood === "excited" ? "lightgreen" : "" }} onClick={() => onFilterSelection("excited")}>Excited Songs</Button>
        <Button variant="contained" style={{ backgroundColor: typeMood === "romantic" ? "lightgreen" : "" }} onClick={() => onFilterSelection("romantic")}>Romantic Songs</Button>
      </Box>
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>
        {filterSongs.map((obj, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3} sx={{marginBottom:"30px"}}>
            <MusicCard
              title={obj.title}
              thumbnail={obj.thumbnail}
              artist={obj.artist}
              id={index}
              onMusicHandler={onMusicHandler}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Moods;
