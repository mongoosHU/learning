import React from 'react';
import { AppBar, Toolbar, Button, Switch} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import useDarkMode from '../Hook/UseDarkMode';


const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Ellenőrizd, van-e token

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Navigáció a login oldalra
  };  

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <AppBar position="static">
      <Toolbar>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
          {isDarkMode ? <Brightness4 /> : <Brightness7 />}
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode} // Váltás meghívása
            color="default"
          />
        </div>
        <Button color="inherit" onClick={() => navigate('/')}>
          Home
        </Button>
        {isLoggedIn ? (
          <>
        <Button color='inherit' onClick={() => navigate('/dashboard')}>
          Dashboard
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
          </>
        ) : (
          <>
          <Button color='inherit' onClick={() => navigate('/signup')}>
          Signup
          </Button>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};


export default Navbar;
