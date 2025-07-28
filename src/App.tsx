import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { setProfile } from './redux/profileSlice';
import { AppDispatch } from './redux/store';
import { Profile } from './types/profile';
import { Box } from '@mui/material';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      try {
        const parsedProfile: Profile = JSON.parse(storedProfile);
        if (parsedProfile?.firstName && parsedProfile?.email) {
          dispatch(setProfile(parsedProfile));
        }
      } catch (error) {
        console.error('Invalid profile data in localStorage:', error);
      }
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Box sx={{ p: 2 }}>
        <AppRoutes />
      </Box>
    </>
  );
};

export default App;
