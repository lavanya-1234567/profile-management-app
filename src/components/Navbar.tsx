
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Navbar = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const fullName = profile.firstName || profile.lastName
    ? `${profile.firstName} ${profile.lastName}`
    : '';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Profile Manager
        </Typography>
        {fullName && (
          <Typography variant="subtitle1">{fullName}</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
