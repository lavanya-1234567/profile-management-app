import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../types/profile';

interface ProfileState {
  profile: Profile | null;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setProfile, clearProfile, setError } = profileSlice.actions;
export default profileSlice.reducer;
