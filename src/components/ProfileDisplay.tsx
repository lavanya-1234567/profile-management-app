import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Alert,
  Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import { setProfile } from '../redux/profileSlice';

const ProfileDisplay = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile);

  const handleEdit = () => {
    navigate('/profile-form');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      localStorage.removeItem('profile');
      dispatch(setProfile({ firstName: '', lastName: '', email: '', age: undefined }));
      navigate('/profile-form');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Profile Details</Typography>
      {profile.firstName ? (
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box>
            <Typography variant="subtitle1"><strong>First Name:</strong> {profile.firstName}</Typography>
            <Typography variant="subtitle1"><strong>Last Name:</strong> {profile.lastName}</Typography>
            <Typography variant="subtitle1"><strong>Email:</strong> {profile.email}</Typography>
            {profile.age !== undefined && (
              <Typography variant="subtitle1"><strong>Age:</strong> {profile.age}</Typography>
            )}
          </Box>

          
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Paper>
      ) : (
        <Alert severity="info">No profile found. Please submit the form first.</Alert>
      )}
    </Container>
  );
};

export default ProfileDisplay;
