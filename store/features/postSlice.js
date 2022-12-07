import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchPosts: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSearchPosts: (state, action) => {
      state.searchPosts = action.payload;
    },
  },
});

export const { setSearchPosts } = postSlice.actions;

export default postSlice.reducer;
