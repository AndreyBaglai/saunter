import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const currentPathSlice = createSlice({
  name: 'currentPath',
  initialState,
  reducers: {
    set(state, action) {
      return { ...action.payload };
    },

    remove(state, action) {
      return action.payload;
    },
  },
});

export default currentPathSlice.reducer;
