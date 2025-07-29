import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import {
  Alert,
  Typography,
  Paper,
  Button,
  Stack,
  Box,
  Divider,
} from '@mui/material';
import { clearProfile, deleteProfileThunk } from '../redux/profileSlice';

const ProfileDisplay: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const error = useSelector((state: RootState) => state.profile.error);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleEdit = () => navigate('/profile-form/edit');

  const handleDelete = async () => {
    if (!profile?.id) return;

    const result = await dispatch(deleteProfileThunk(profile.id));
    if (deleteProfileThunk.fulfilled.match(result)) {
      localStorage.removeItem('profile');
      dispatch(clearProfile());
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
        navigate('/profile-form');
      }, 1000);
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
    <Paper
      elevation={4}
      sx={{
        mt: 6,
        p: 4,
        maxWidth: 500,
        mx: 'auto',
        borderRadius: 3,
        bgcolor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
        Profile Details
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={500}>
          Name:
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.firstName} {profile.lastName}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={500}>
          Email:
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.email}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={500}>
          Age:
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.age}
        </Typography>
      </Box>

      {deleteSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Profile deleted successfully!
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};

export default ProfileDisplay;
