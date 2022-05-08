/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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
  reducers: {},
});

export default authSlice.reducer;
