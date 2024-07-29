import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import axios from 'axios';
import {
  Grid, TextField, List, ListItem, ListItemIcon, ListItemText, Divider,
  Box, IconButton, Drawer, Typography
} from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import three from '../assets/three.svg';
import four from '../assets/four.svg';
import seven from '../assets/seven.svg';
import home from '../assets/home.svg';
import browse from '../assets/browse.svg';
import nine from '../assets/nine.svg';
import ten from '../assets/ten.svg';
import signin from '../assets/signin.svg';
import './sidebar.css';

const SidebarCol = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '20px',
  },
}));

const LightGrayBox = styled(Box)({
  background: 'lightgray',
});

function Sidebar() {
  const { setSearchData, setErrorMessage } = useUser();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  const handleFavoritesClick = () => {
    navigate(`/library?key=${refreshKey}`);
    setRefreshKey(prevKey => prevKey + 1);
  };

  const onSearchDetails = async (event) => {
    const queryString = {
      title: event.target.value
    };
    setSearchText(event.target.value);
    try {
      const response = await axios.get('https://academics.newtonschool.co/api/v1/music/song', {
        params: {
          search: JSON.stringify(queryString)
        },
        headers: {
          projectID: 'f104bi07c490'
        }
      });
      setSearchData(response.data.data);
      navigate('/search');
    } catch (error) {
      setSearchData(null);
    }
  };

  const handleNavigation = (path) => {
    setSearchText('');
    navigate(path);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, position: 'sticky', zIndex: '1', top: '0px', background: 'rgb(249,249,249)' }}>
        <SidebarCol>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <div className="logoContainer">
                <Link to="/">
                  <img src={three} alt="applelogo" className="applelogo" />
                </Link>
              </div>
            </Grid>
            <Grid item>
              <div className="appSearchNavbar" style={{ marginLeft: '5%' }}>
                <TextField
                  type="text"
                  placeholder="Search..."
                  variant="outlined"
                  value={searchText}
                  onChange={onSearchDetails}
                />
                <div className='searchIcon-navbar' style={{ marginLeft: '3%', marginBottom: '10%' }}>
                  <img src={four} alt="" />
                </div>
              </div>
            </Grid>
            <Grid item>
              <List>
                <ListItem button onClick={() => handleNavigation('/')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                  <ListItemIcon>
                    <img src={home} alt="" />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation('/browse')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                  <ListItemIcon>
                    <img src={browse} alt="" />
                  </ListItemIcon>
                  <ListItemText primary="Browse" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation('/radio')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                  <ListItemIcon>
                    <img src={seven} alt="" />
                  </ListItemIcon>
                  <ListItemText primary="Radio" />
                </ListItem>
                <Divider />
                <Grid item>
                  <h3 style={{ marginLeft: '5%' }}>PlayLists</h3>
                  <ListItem button onClick={() => handleNavigation('/moods')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px', marginLeft: '20px' }}>
                    <ListItemText primary="Moods" />
                  </ListItem>
                  <ListItem button onClick={() => handleNavigation('/album1')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px', marginLeft: '20px' }}>
                    <ListItemText primary="Albums" />
                  </ListItem>
                  {localStorage.getItem("token") && (
                    <ListItem button onClick={handleFavoritesClick} style={{ textDecoration: 'none', color: 'black', fontSize: '18px', marginLeft: '20px' }}>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Favorites" />
                    </ListItem>
                    
                  )}
                  {localStorage.getItem("token") && ( <ListItem button onClick={() => handleNavigation('/changepassword')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px', marginLeft: '20px' }}>
                    <ListItemText primary="Change Password" />
                  </ListItem>)}
                 
                </Grid>
                <Divider />
                <Grid item>
                  <p style={{ marginLeft: '20px' }}>
                    <img src={nine} alt="" /> Open in Music <img src={ten} alt="" />
                  </p>
                </Grid>
              </List>
            </Grid>
          </Grid>
          <div className='login' style={{ backgroundColor: 'red', borderRadius: '10px', width: "150px", marginLeft: "15px" }}>
            {!localStorage.getItem('token') ? (
              <button style={{ backgroundColor: 'red', borderRadius: '6px', color: 'white', border: "none", textDecoration: "none" }} onClick={handleLogin}>
                <img src={signin} alt='' style={{ marginRight: '4px' }} /> Sign In
              </button>
            ) : (
              <button style={{ backgroundColor: 'red', borderRadius: '6px', color: 'white', border: "none", textDecoration: "none" }} onClick={logoutHandler}>
                <img src={signin} alt='' style={{ marginRight: '4px' }} /> Sign out
              </button>
            )}
          </div>
        </SidebarCol>
      </Box>

      {/* Mobile Drawer */}
      <Box sx={{ display: { md: 'none' } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box onClick={handleDrawerToggle}>
            <Grid container direction="column" spacing={2}>
              {/* Repeat Sidebar content here for mobile drawer */}
            </Grid>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default Sidebar;
