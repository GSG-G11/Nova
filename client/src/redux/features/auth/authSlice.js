/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import checkUser from './authService';

let userExist;
(async () => {
  const user = await checkUser();
  if (user) {
    userExist = true;
  } else {
    userExist = false;
  }
})();
// Create the initial state for the auth feature
const initialState = {
  isAuthenticated: false,
  user: userExist,
  loading: false,
};

// Create the authSlice, which will contain the reducer and the actions

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
