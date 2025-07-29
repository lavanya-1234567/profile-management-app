
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Navbar: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);

  const fullName =
    profile && (profile.firstName || profile.lastName)
      ? `${profile.firstName?.trim() || ''} ${profile.lastName?.trim() || ''}`.trim()
      : 'Guest';

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #1976d2, #42a5f5)',
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
          Profile Management App
        </Typography>

        <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 500 }}>
          Welcome, {fullName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;