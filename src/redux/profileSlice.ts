import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from '../types/profile';
import {
  createProfileInAPI,
  updateProfileInAPI,
  deleteProfileFromAPI,
} from '../utils/api';

interface ProfileState {
  profile: Profile | null;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  error: null,
};

const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Something went wrong';
};

export const createProfileThunk = createAsyncThunk(
  'profile/create',
  async (profileData: Profile, { rejectWithValue }) => {
    try {
      return await createProfileInAPI(profileData);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  'profile/update',
  async (profileData: Profile, { rejectWithValue }) => {
    try {
      return await updateProfileInAPI(profileData);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteProfileThunk = createAsyncThunk(
  'profile/delete',
  async (profileId: string, { rejectWithValue }) => {
    try {
      await deleteProfileFromAPI(profileId);
      return profileId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(createProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(createProfileThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(deleteProfileThunk.fulfilled, (state) => {
        state.profile = null;
        state.error = null;
      })
      .addCase(deleteProfileThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setProfile, clearProfile, setError } = profileSlice.actions;
export default profileSlice.reducer;
