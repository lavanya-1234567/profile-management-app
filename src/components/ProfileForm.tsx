import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setProfile } from '../redux/profileSlice';
import { Profile } from '../types/profile';
import { saveProfileToAPI, updateProfileInAPI } from '../utils/api';
import { useLocation, useNavigate } from 'react-router-dom';

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
        age: profile.age.toString(), 
      });
    }
  }, [editMode, profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const numericAge = Number(formData.age);

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      isNaN(numericAge) ||
      numericAge <= 0
    ) {
      setError('All fields are required and age must be a valid positive number.');
      setLoading(false);
      return;
    }

    try {
      let savedProfile: Profile;
      const finalFormData: Profile = {
        ...formData,
        age: numericAge,
      };

      if (editMode && formData.id) {
        savedProfile = await updateProfileInAPI(formData.id, finalFormData);
        setSuccess('Profile updated successfully!');
      } else {
        savedProfile = await saveProfileToAPI(finalFormData);
        setSuccess('Profile saved successfully!');
      }

      dispatch(setProfile(savedProfile));
      localStorage.setItem('profile', JSON.stringify(savedProfile));
      navigate('/profile');
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {editMode ? 'Edit Profile' : 'User Profile Form'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            inputProps={{ min: 1 }}
          />

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
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
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
      </Box>
    </Container>
  );
};

export default ProfileForm;
