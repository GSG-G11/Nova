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
  reducers: {
    signUpAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const { signUpAction } = authSlice.actions
});

export default authSlice.reducer;
