import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { setProfile } from './redux/profileSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      dispatch(setProfile(JSON.parse(storedProfile)));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
};

export default App;
