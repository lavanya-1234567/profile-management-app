import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import { Alert, Typography, Box, Paper, Button, Stack } from '@mui/material';
import { deleteProfileFromAPI } from '../utils/api';
import { clearProfile } from '../redux/profileSlice';

const ProfileDisplay: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleEdit = () => {
    navigate('/profile-form/edit');
  };

  const handleDelete = async () => {
    if (!profile?.id) {
      setDeleteError('Invalid profile ID');
      return;
    }

    try {
      await deleteProfileFromAPI(profile.id);
      dispatch(clearProfile());
      localStorage.removeItem('profile');
      setDeleteSuccess(true);

      setTimeout(() => {
        setDeleteSuccess(false);
        navigate('/profile-form');
      }, 1000);
    } catch (error) {
      setDeleteError('Failed to delete profile. Please try again.');
      console.error(error);
    }
  };

  if (!profile) {
    return (
      <Alert severity="info" sx={{ mt: 4 }}>
        No profile found. Please create one.
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Name: {profile.firstName} {profile.lastName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {profile.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Age: {profile.age}
      </Typography>

      {deleteSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Profile deleted successfully!
        </Alert>
      )}

      {deleteError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {deleteError}
        </Alert>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};

export default ProfileDisplay;
