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
        "https://easy-tan-dove-yoke.cyclic.app/api/orders",
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
        "https://easy-tan-dove-yoke.cyclic.app/api/orders",
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

//Orders count API call get request
export const CountOrders = createAsyncThunk(
  "count/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "https://easy-tan-dove-yoke.cyclic.app/api/orders/count",
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Get single order by order number
export const getSingleOrder = createAsyncThunk(
  "orders/getSingleOrder",
  async (orderNo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `https://easy-tan-dove-yoke.cyclic.app/api/orders/${orderNo}`,
        config
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//Update Single Order POST request
export const updateOrder = createAsyncThunk(
  "orders/update",
  async (updateFormData, thunkAPI) => {
    try {
      const { id, tracking, shippingCost } = updateFormData;
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `https://easy-tan-dove-yoke.cyclic.app/api/orders/${id}`,
        { tracking, shippingCost },
        config
      );
      return console.log(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//update Order Compelte mark put request
export const CompleteMArkOrder = createAsyncThunk(
  "orders/completemark",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `https://easy-tan-dove-yoke.cyclic.app/api/orders/completemark/${id}`,
        { completeMarked: true },
        config
      );
      return console.log(response.data);
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
  OrderCount: "",
  singleOrder: {},
  updatedOrder: {},
  orderNotFound: false,
  completeMarkLoading: false,
  completeMarkError: false,
  completeMarkStatus: false,
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
      state.completeMarkStatus = false;
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
      })
      // Counting Orders for home page cases
      .addCase(CountOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CountOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.OrderCount = action.payload;
      })
      .addCase(CountOrders.rejected, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      //getting single orders cases
      .addCase(getSingleOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrder = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoading = false;
        state.orderNotFound = true;
      })
      //Update single order add cases
      .addCase(updateOrder.pending, (state) => {
        // state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedOrder = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        // state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      //complete mark add cases
      .addCase(CompleteMArkOrder.pending, (state) => {
        state.completeMarkLoading = true;
      })
      .addCase(CompleteMArkOrder.fulfilled, (state, action) => {
        state.completeMarkLoading = false;
        state.completeMarkStatus = true;
      })
      .addCase(CompleteMArkOrder.rejected, (state, action) => {
        state.completeMarkLoading = false;
        state.completeMarkStatus = false;
        state.completeMarkError = true;
      });
  },
});
export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
