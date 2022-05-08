import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVerified: false,
  role: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isVerified = action.payload.isVerified;
      // eslint-disable-next-line no-param-reassign
      state.role = action.payload.role;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
