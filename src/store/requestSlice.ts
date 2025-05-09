import { createSlice } from "@reduxjs/toolkit";
import { Connection } from "../types/connection";

const initialState: any = null;
const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    addRequest: (_state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArr = state.filter(
        (req: Connection) => req.requestId !== action.payload
      );
      return newArr;
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
