import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import DirectionsIcon from '@mui/icons-material/Directions';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { ImCart } from 'react-icons/im'
import { CiSearch } from 'react-icons/ci'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import CartContext from '../config/cartContext';
import CartDrawer from './drawer';
import '../index.css'

import { BsHandbagFill } from 'react-icons/bs'
import { NavLink, useLocation } from 'react-router-dom';

import { Input } from 'antd';
const { Search } = Input;

// const pages = ['Products', 'Categories'];
const settings = ['Account', 'Logout'];

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function ResponsiveAppBar({ }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = useState(false)
  const { cartNum, setCartNum } = useContext(CartContext)

  const location = useLocation()

  return (
    <AppBar position="fixed" className='navbar' sx={{ zIndex: 10 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <NavLink to={'/home'} style={{ textDecoration: 'none', }}>
            <Typography
              variant="h5"
              noWrap
              component="p"
              sx={{
                mr: 5,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Teko, sans-serif',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: '#0b0027',
              }}
            >
              <span>FLEX</span><span style={{ color: '#fff' }}>US</span>
            </Typography>
          </NavLink>

          {/* {location.pathname !== '/login' && location.pathname !== '/' ? <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <NavLink to={'/home'}>
                        {page}
                      </NavLink>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </> : <></>} */}

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <NavLink to={'/home'} style={{ textDecoration: 'none', }}>
            <Typography
              variant="h5"
              noWrap
              component="p"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: '#000' }}>FLEX</span> <span>US</span>
            </Typography>
          </NavLink>

          {location.pathname !== '/login' && location.pathname !== '/' ? <>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 5, position: 'relative' }}>


              {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))} */}


              {/* <input type="search" placeholder='Search Clothes' className='nav-search-bar'></input>
              <CiSearch className='nav-search-but' /> */}


              <Search style={{ maxWidth: '30%', marginLeft: 'auto' }} placeholder="Search clothes" loading={false} />




              {/* <Paper
                component="form"
                sx={{ p: '-15px', display: 'flex', alignItems: 'center', width: 350, marginLeft: 'auto' }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Clothes"
                  inputProps={{ 'aria-label': 'search clothes' }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
 */}




            </Box>
          </> : <></>}


          <Box className='cart-prof-con'>
            <IconButton aria-label="cart" onClick={() => setOpen(true)}>
              <StyledBadge style={{ fontSize: '40px' }} badgeContent={cartNum} color="primary">
                <BsHandbagFill size='22' color='#fff' />
              </StyledBadge>
            </IconButton>
            <CartDrawer open={open} onClose={setOpen} />

            {localStorage.getItem('UID') ?
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              :
              <NavLink to={location.pathname !== '/login' && location.pathname !== '/' ? '/login' : '/home'}>
                <Button variant="outlined" sx={{ color: 'white', borderColor: '#fff' }}>{location.pathname !== '/login' && location.pathname !== '/' ? 'Login' : 'Shop'}</Button>
              </NavLink>
            }

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>

        {location.pathname !== '/login' && location.pathname !== '/' ?
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexGrow: 1, justifyContent: 'center', my: 1 }}>
            {/* <input style={{ width: '250px', marginLeft: 'auto' }} type="search" placeholder='Search Clothes' className='nav-search-bar' />
            <CiSearch style={{ marginRight: 'auto' }} className='nav-search-but' /> */}

            <Search style={{ maxWidth: '90%', margin: '0 auto' }} placeholder="Search clothes" loading={false} />

          </Box> : <></>}
      </Container>
    </AppBar >
  );
}

export default ResponsiveAppBar;