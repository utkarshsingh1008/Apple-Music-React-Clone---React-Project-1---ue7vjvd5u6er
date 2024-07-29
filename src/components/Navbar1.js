import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaBackward, FaForward, FaVolumeUp, FaApple } from 'react-icons/fa';
import { IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Sidebar from './Sidebar';
import { useUser } from '../providers/UserProvider';
import './navbar1.css';
import { IoMusicalNotesSharp } from "react-icons/io5";
import signin from '../assets/signin.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import three from '../assets/three.svg';

const Navbar1 = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isClickPending, setIsClickPending] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const { audioPlayerSong, setAudioPlayerSong, songId } = useUser();
    const audioPlayer = useRef(null);
    const progressBar = useRef(null);
    const animationRef = useRef(null);
    const { onTokenHandler, onNameHandler } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        setIsFavorited(false);
    }, [props]);

    useEffect(() => {
        if (songId) {
            setAudioPlayerSong((prevSong) => ({
                ...prevSong,
                song: songId,
            }));
        }
    }, [songId, setAudioPlayerSong]);

    const onClickHandlerFav = () => {
        if (!songId) {
            console.error("Invalid songId:", songId);
            alert("Invalid song ID. Cannot add to favorites.");
            return;
        }

        if (isClickPending) return;
        setIsClickPending(true);
        setTimeout(() => {
            setIsClickPending(false);
        }, 500);

        axios
            .patch(
                `https://academics.newtonschool.co/api/v1/music/favorites/like`,
                { songId: songId },
                {
                    headers: {
                        projectID: "f104bi07c490",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((result) => {
                console.log(result);
                alert(result.data.message);
                setIsFavorited(!isFavorited);
            })
            .catch((error) => {
                console.error("Error adding to favorites:", error.response.data);
                alert("Failed to add to favorites. Please try again.");
            });
    };

    const logoutHandler = (event) => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        event.preventDefault();
        navigate('/');
        window.location.reload();
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleChangePassword = () => {
        navigate('/changepassword');
    };

    useEffect(() => {
        if (audioPlayer.current) {
            audioPlayer.current.volume = volume / 100;
        }
    }, [volume]);

    useEffect(() => {
        if (audioPlayer.current && audioPlayerSong) {
            audioPlayer.current.src = audioPlayerSong.audio_url;
            audioPlayer.current.load();
            audioPlayer.current.onloadeddata = () => {
                setDuration(audioPlayer.current.duration);
                if (progressBar.current) {
                    progressBar.current.max = audioPlayer.current.duration;
                }
                if (isPlaying) {
                    audioPlayer.current.play();
                }
            }
        }
    }, [audioPlayerSong, isPlaying]);

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        if (progressBar.current) {
            progressBar.current.value = audioPlayer.current.currentTime;
            changePlayerCurrentTime();
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    }

    const changeRange = () => {
        if (audioPlayer.current && progressBar.current) {
            audioPlayer.current.currentTime = progressBar.current.value;
            changePlayerCurrentTime();
        }
    }

    const changePlayerCurrentTime = () => {
        if (progressBar.current) {
            progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
            setCurrentTime(progressBar.current.value);
        }
    }

    const backThirty = () => {
        if (progressBar.current) {
            progressBar.current.value = Number(progressBar.current.value) - 30;
            changeRange();
        }
    }

    const forwardThirty = () => {
        if (progressBar.current) {
            progressBar.current.value = Number(progressBar.current.value) + 30;
            changeRange();
        }
    }

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    return (
        <>
            <div className="navbar" style={{ flexGrow: 1, position: 'sticky', width: '100%', zIndex: '1', top: '0px' }}>
            <div className="drawer"><IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ m: 1 }}
                >
                    <MenuIcon />
                </IconButton> </div>
                
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <Sidebar />
                </Drawer>
               
                
                    {  <div className='music-control'>
                        <audio ref={audioPlayer} preload="metadata"></audio>
                        <button onClick={backThirty} className="icon" style={{ border: 'none', textDecoration: 'none', background: "none" }}>
                            <FaBackward color='lightgray' size="25px" />
                        </button>
                        <button className="icon" onClick={audioPlayerSong && togglePlayPause} style={{ border: 'none', textDecoration: 'none', background: "none" }}>
                         { (isPlaying ? <FaPause color='lightgray' size="25px" />: <FaPlay color='lightgray' size="25px" />)}
                        </button>
                        <button onClick={forwardThirty} className="icon" style={{ border: 'none', textDecoration: 'none', background: "none" }}>
                            <FaForward color='lightgray' size="25px" />
                        </button>
                    </div>}
                    <div className="nav-controls">
                    <div className="logs" style={{ height: '50px' }}>
                        <div className='logos' style={{ border: "1px solid gray", backgroundColor: "lightgray", height: "50px", width: "50px" }}>
                            {audioPlayerSong?.thumbnail ? (
                                <img src={audioPlayerSong.thumbnail} alt="thumbnail" style={{ width: '50px' }} />
                            ) : (
                                <IoMusicalNotesSharp size={30} className='music-icon' />
                            )}
                        </div>
                        {isPlaying && audioPlayerSong ? (
                            <div className='timestap' style={{ display: 'flex', marginLeft: '20px', alignItems: 'center' }}>
                                <div className='duration'>{calculateTime(currentTime)}</div>
                                <div>
                                    <input
                                        type="range"
                                        defaultValue="0"
                                        ref={progressBar}
                                        onChange={changeRange}
                                        style={{
                                            margin: '0 10px',
                                            WebkitAppearance: 'none',
                                            appearance: 'none',
                                            background: 'gray',
                                            height: '6px',
                                            borderRadius: '5px',
                                            outline: 'none',
                                            opacity: '0.7',
                                            transition: 'opacity .2s',
                                        }}
                                         className="responsive-range"
                                    />
                                </div>
                                <div className='duration'>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
                            </div>
                        ) : (
                            <div className="icon-container">
      <FaApple size={30} color="gray" className="custom-icon" />
    </div>
                        )}
                    </div>
                    <button
                        style={{ fontSize: "12px", width: "40px", height: '40px', marginTop: "0px", marginLeft: '0px', border: "none", textDecoration: "none", background: "none" }}
                        onClick={() => onClickHandlerFav()}
                    >
                        {localStorage.getItem("token") && <FavoriteIcon style={{ color: isFavorited ? 'red' : 'white', fontSize: isFavorited ? '42px' : '30px' }} />}
                    </button>
                    <div className="volume-control" style={{marginRight:"25px"}}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FaVolumeUp style={{ marginRight: '5px' }} />
                            <input
                                type="range"
                                id="volume"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                            />
                        </div>
                    </div>
                    </div>
                    <div className='nav-login' style={{ backgroundColor: 'red', borderRadius: '10px' }}>
                        {!localStorage.getItem('token') ? (
                            <button style={{ backgroundColor: 'red', borderRadius: '6px', color: 'white' }} onClick={handleLogin}>
                                <img src={signin} alt='' style={{ marginRight: '4px' }} /> Sign In
                            </button>
                        ) : (
                            <button style={{ backgroundColor: 'red', borderRadius: '6px', color: 'white' }} onClick={logoutHandler}>
                                <img src={signin} alt='' style={{ marginRight: '4px' }} /> Sign out
                            </button>
                        )}
                    </div>
                
            </div>
        </>
    );
}

export default Navbar1;
