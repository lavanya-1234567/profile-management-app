import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';

// --- Configure Redux Store ---
export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

// --- Types for State and Dispatch ---
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
