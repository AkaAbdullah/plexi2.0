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
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      const message = error.toString();
      return rejectWithValue(message);
    }
  }
);

//logout function
export const logoutUserFunction = createAsyncThunk("auth/logout", async () => {
  await localStorage.removeItem("user");
});
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
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
      state.user = null;
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
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(logoutUserFunction.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
