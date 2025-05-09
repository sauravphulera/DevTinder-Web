import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (_state, action) => {
      return action.payload;
    },
    removeConnection: () => null,
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;
