/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all orders function API call here to show in the main table
export const getAllOrders = createAsyncThunk(
  "orders/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:5000/api/orders",
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//POST Request Creating Orders
export const CreateOrders = createAsyncThunk(
  "orders/create",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        formData,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  orders: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  createdOrder: {},
};

export const ordersSlice = createSlice({
  name: "orders",
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
      //Get ORDERS CASES
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      //POST ORDERS CASES
      .addCase(CreateOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(CreateOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdOrder = action.payload;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(CreateOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
