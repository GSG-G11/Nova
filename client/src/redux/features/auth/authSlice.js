/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const checkUser = createAsyncThunk('auth/checkUser', async (_, thinkAPI) => {
  try {
    return await authService.checkUser();
  } catch (error) {
    return thinkAPI.rejectWithValue(error);
  }
});
// Create the initial state for the auth feature
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

// Create the authSlice, which will contain the reducer and the actions

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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

export default authSlice.reducer;
