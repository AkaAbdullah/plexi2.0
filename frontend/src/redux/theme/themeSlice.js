import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
