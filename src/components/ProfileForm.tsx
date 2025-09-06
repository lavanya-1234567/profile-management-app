import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../redux/store';
import { setProfile } from '../redux/profileSlice';
import { createProfileThunk, updateProfileThunk } from '../redux/profileSlice';
import { Profile } from '../types/profile';

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.profile);
  const editMode = location.pathname.includes('edit');

  const [formData, setFormData] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (editMode && profile) {
      setFormData({
        ...profile,
        age: profile.age?.toString() || '',
      });
    }
  }, [editMode, profile]);

  const validateForm = (): boolean => {
    if (!formData.firstName.trim() || formData.firstName.trim().length < 3) {
      setError('First name must be at least 3 characters long.');
      return false;
    }

    if (!formData.lastName.trim() || formData.lastName.trim().length < 3) {
      setError('Last name must be at least 3 characters long.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (formData.age && isNaN(Number(formData.age))) {
      setError('Age must be a valid number if provided.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      let savedProfile: Profile;
      const finalFormData: Profile = {
        ...formData,
        age: formData.age !== '' ? Number(formData.age) : undefined,
      };

      if (editMode && formData.id) {
        const result = await dispatch(updateProfileThunk(finalFormData));
        if (updateProfileThunk.fulfilled.match(result)) {
          savedProfile = result.payload;
          setSuccess('Profile updated successfully!');
        } else throw new Error();
      } else {
        const result = await dispatch(createProfileThunk(finalFormData));
        if (createProfileThunk.fulfilled.match(result)) {
          savedProfile = result.payload;
          setSuccess('Profile created successfully!');
        } else throw new Error();
      }

      dispatch(setProfile(savedProfile));
      localStorage.setItem('profile', JSON.stringify(savedProfile));
      navigate('/profile');
    } catch {
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          background: 'linear-gradient(145deg, #ffffff, #f3f6f9)',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight={700}
          gutterBottom
          sx={{
            color: editMode ? '#ff9800' : '#1976d2',
            mb: 3,
          }}
        >
          {editMode ? 'Edit Profile' : 'Create Your Profile'}
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            margin="normal"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            margin="normal"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="normal"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            inputProps={{ min: 0 }}
            margin="normal"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />

          {/* Alerts */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              borderRadius: 3,
              textTransform: 'none',
              background: editMode
                ? 'linear-gradient(to right, #ff9800, #f57c00)'
                : 'linear-gradient(to right, #1976d2, #42a5f5)',
              '&:hover': {
                background: editMode
                  ? 'linear-gradient(to right, #f57c00, #ef6c00)'
                  : 'linear-gradient(to right, #1565c0, #1976d2)',
              },
            }}
            disabled={loading}
          >
            {loading
              ? editMode
                ? 'Updating...'
                : 'Saving...'
              : editMode
              ? 'Update Profile'
              : 'Save Profile'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfileForm;
