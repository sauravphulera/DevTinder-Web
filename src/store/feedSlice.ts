import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user";
const initialState: any = null;
const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed: (_state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const newArr = state.filter((user: User) => user._id !== action.payload);
      return newArr;
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
