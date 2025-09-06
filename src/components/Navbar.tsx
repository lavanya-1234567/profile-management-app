
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
        background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 50%, #42a5f5 100%)',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        py: { xs: 1, sm: 2 },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#fff',
            letterSpacing: 0.5,
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          Profile Management App
        </Typography>

        <Box
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.15)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
            transition: 'background-color 0.3s ease',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: '#fff',
              fontWeight: 500,
              fontSize: { xs: '0.85rem', sm: '1rem' },
            }}
          >
            Welcome, {fullName}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
