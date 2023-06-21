import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//creating User Login Action here
export const loginUserFunction = createAsyncThunk(
  "auth/login",
  async (userLoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        userLoginData
      );
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response));
      }
      return response.data;
    } catch (error) {
      const message = error.toString();
      return rejectWithValue(message);
    }
  }
);

//get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isLoading = false), (state.isError = false), (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserFunction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserFunction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUserFunction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
