import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  number: "",
  date: "",
};

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { changeFilter } = slice.actions;
export const filterReducer = slice.reducer;
