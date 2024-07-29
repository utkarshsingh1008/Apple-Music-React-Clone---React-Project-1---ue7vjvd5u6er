import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Box, useMediaQuery, useTheme, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import MusicPlayer from './Musicplayer';
import signin from '../assets/signin.svg';
import Sidebar from './Sidebar';

const Navbar = () => {
  const { audioPlayerSong, setSearchData } = useUser();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const { onTokenHandler, onNameHandler } = useUser();

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

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      {isMobile ? (
        <>
          <IconButton 
            color="inherit" 
            aria-label="open drawer" 
            edge="start" 
            onClick={handleDrawerToggle}
            sx={{ m: 1 }}
          >
            <MenuIcon />
          </IconButton>
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
        </>
      ) : ""}
    
      <Box sx={{ flexGrow: 1, position: 'sticky', width: '100%', zIndex: '1', top: '0px' }}>
        <AppBar position="static" sx={{ background: "lightgray" }}>
          <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <MusicPlayer
              audio_url={audioPlayerSong?.audio_url}
              thumbnail={audioPlayerSong?.thumbnail}
              songId={audioPlayerSong?._id}
              style={{ height: '80%', position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1, border: 'none' }}
            />
            <Box display="flex" alignItems="center">
              {!isMobile && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon onClick={handleChangePassword} />
                </IconButton>
              )}
              {isMobile && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ marginLeft: -2 }}
                >
                  <MenuIcon onClick={handleChangePassword} />
                </IconButton>
              )}
              {!localStorage.getItem('token') ? (
                <Button color="inherit" sx={{ background: 'red' }} onClick={handleLogin}>
                  <img src={signin} alt='' style={{ marginRight: '4px' }} /> Sign In
                </Button>
              ) : (
                <Button color="inherit" sx={{ background: 'red' }} onClick={logoutHandler}>
                  <img src={signin} alt='' style={{ marginRight: '4px' }} /> {localStorage.getItem('name')} Sign out
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
