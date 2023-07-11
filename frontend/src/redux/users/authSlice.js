import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//creating User Login Action here
export const loginUserFunction = createAsyncThunk(
  "auth/login",
  async (userLoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://easy-tan-dove-yoke.cyclic.app/api/users/login",
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

//udating  user password  put REQUEST
export const updatePassword = createAsyncThunk(
  "auth/getme",
  async (data, thunkAPI) => {
    try {
      const { id, password } = data;
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `https://easy-tan-dove-yoke.cyclic.app/api/users/${id}`,
        { password },
        config
      );
      console.log(password);
      console.log("sliceid", id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//Creating a new User POST request
export const createUser = createAsyncThunk(
  "auth/create",
  async (data, thunkAPI) => {
    const { userName, email, password, roles } = data;
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "https://easy-tan-dove-yoke.cyclic.app/api/users",
        data,
        config
      );
      console.log(data);
      return console.log(response.data);
    } catch (error) {
      console.log(error);
      throw error;
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
  error: "",
  createdUser: null,
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
    reset2: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
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
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "User created successfully";
        // Save the response in state
        state.createdUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Failed to create user";
        // Save the error in state
        state.error = action.error.message;
      });
  },
});

export const { reset, reset2 } = authSlice.actions;
export default authSlice.reducer;
