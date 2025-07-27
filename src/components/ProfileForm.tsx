import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setProfile } from '../redux/profileSlice';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { saveProfileToAPI } from '../utils/api'; 

const ProfileForm = () => {
  const existingProfile = useSelector((state: RootState) => state.profile);

  const [firstName, setFirstName] = useState(existingProfile.firstName || '');
  const [lastName, setLastName] = useState(existingProfile.lastName || '');
  const [email, setEmail] = useState(existingProfile.email || '');
  const [age, setAge] = useState(existingProfile.age?.toString() || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); 

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const validate = () => {
    if (firstName.trim().length < 3) {
      setError('First name must be at least 3 characters');
      return false;
    }
    if (lastName.trim().length < 1) {
      setError('Last name is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      return false;
    }
    if (age && isNaN(Number(age))) {
      setError('Age must be a number');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const profileData = {
      firstName,
      lastName,
      email,
      age: age ? Number(age) : undefined,
    };

    setLoading(true); 

    try {
      await saveProfileToAPI(profileData); 
      dispatch(setProfile(profileData));
      localStorage.setItem('profile', JSON.stringify(profileData));
      setSuccess(true);
      navigate('/profile');
    } catch (err) {
      setError('❌ Failed to save profile. Try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Profile Form</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
        </Button>

        {error && <Alert severity="error">{error}</Alert>}

        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          message="✅ Profile saved!"
        />
      </Box>
    </Container>
  );
};

export default ProfileForm;
