import { createSlice } from "@reduxjs/toolkit";

const initialState: any = null;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (_state, action) => {
      return action.payload;
    },
    removeUser: () => null,
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
