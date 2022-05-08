import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/auth/user';
// Create the store, and export it for use in the application
const store = configureStore({
  reducer: {
    // reducer name
    // reducer function
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
