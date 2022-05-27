/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

export const checkUser = createAsyncThunk('auth/checkUser', async () => authService.checkUser());
// Create the initial state for the auth feature
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

// Create the authSlice, which will contain the reducer and the actions

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setImage: (state, action) => {
      state.user = {
        ...state.user,
        profilePicture: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(checkUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkUser.rejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    });
  },
});

export const { setUser, clearUser, setImage } = authSlice.actions;
export default authSlice.reducer;
