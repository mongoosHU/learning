import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="static" >
      <Toolbar>
        <Button color="inherit" onClick={() => handleNavigation('/')}>
          Home
        </Button>
        <Button color="inherit" onClick={() => handleNavigation('/addcourse')}>
          Add Courses
        </Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
