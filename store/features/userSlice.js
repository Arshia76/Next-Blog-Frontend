import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('next-blog-user')) || {}
      : {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('next-blog-user', action.payload);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
