import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
}

const initialState: ProfileState = {
  firstName: '',
  lastName: '',
  email: '',
  age: undefined,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      return { ...action.payload };
    },
    clearProfile: () => initialState,
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
