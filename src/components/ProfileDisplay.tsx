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
  Avatar,
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
      <Alert severity="info" sx={{ mt: 6, maxWidth: 500, mx: 'auto' }}>
        No profile found. Please create one.
      </Alert>
    );
  }

  return (
    <Paper
      elevation={5}
      sx={{
        mt: 6,
        p: 5,
        maxWidth: 550,
        mx: 'auto',
        borderRadius: 4,
        bgcolor: 'white',
        textAlign: 'center',
      }}
    >
      <Avatar
        sx={{
          bgcolor: '#1976d2',
          width: 80,
          height: 80,
          fontSize: '2rem',
          fontWeight: 600,
          mb: 2,
          mx: 'auto',
        }}
      >
        {profile.firstName?.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Profile Details
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Name
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.firstName} {profile.lastName}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Email
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.email}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Age
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.age || 'N/A'}
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
      <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEdit}
          sx={{ px: 4, borderRadius: 2 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ px: 4, borderRadius: 2 }}
        >
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};

export default ProfileDisplay;
