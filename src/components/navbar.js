import React, { useState, useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import CartContext from '../config/cartContext';
import CartDrawer from './drawer';
import { BsHandbagFill } from 'react-icons/bs'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../index.css'

const settings = ['Account', 'Logout'];

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = useState(false)
  const { cartNum, setCartNum } = useContext(CartContext)

  const location = useLocation()
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('UID');
    localStorage.removeItem('token');
    if (location.pathname === '/home/user') {
      navigate('/home');
    }
    window.location.reload()
  }

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 150) {
        setIsSticky(true);
      } else if (window.scrollY === 0) {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      className={`navbar ${isSticky ? 'sticky-navbar' : ''}`}
      sx={{
        zIndex: 199,
        position: 'absolute',
      }}
    >
      <Container maxWidth="m">
        <Toolbar disableGutters >
          <NavLink to={'/home'} style={{ textDecoration: 'none', }}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }} >
            <Typography
              variant="h5"
              noWrap
              component="p"
              sx={{
                mr: 5,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: '#fff',
                textTransform: 'uppercase'
              }}
            >
              <span>STORE</span>
            </Typography>
          </NavLink>

          <NavLink to={'/home'} style={{ textDecoration: 'none', }}>
            <Typography
              variant="h5"
              noWrap
              component="p"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: '#fff',
                textDecoration: 'none',
                textTransform: 'uppercase'
              }}
            >
              <span>FLEXUS</span>
            </Typography>
          </NavLink>

          <Box className='cart-prof-con'>
            {
              cartNum >= 1 && location.pathname !== '/home/checkout/order' && location.pathname !== '/home/checkout' && (
                < IconButton className='cart-con' aria-label="cart" onClick={() => setOpen(true)}>
                  <StyledBadge badgeContent={cartNum} color="primary">
                    <BsHandbagFill size='22' color='#fff' />
                  </StyledBadge>
                </IconButton>
              )}

            <CartDrawer open={open} onClose={setOpen} />

            {localStorage.getItem('UID') && localStorage.getItem('token') ?
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              :
              <NavLink to={location.pathname !== '/login' && location.pathname !== '/' ? '/login' : '/home'}>
                <Button variant="outlined" sx={{ color: 'white', borderColor: '#fff' }}>
                  <span>
                    {location.pathname !== '/login' && location.pathname !== '/' ? 'Login' : 'Shop'}
                  </span>
                </Button>
              </NavLink>}

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
              {settings.map((setting) => {
                return (
                  <div key={setting}>
                    {setting === 'Logout' ? (
                      <MenuItem onClick={() => { handleCloseUserMenu(); handleLogout(); }}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ) : (
                      <NavLink style={{ textDecoration: 'none' }} to={'/home/user'}>
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      </NavLink>
                    )}
                  </div>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}

export default ResponsiveAppBar;