import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./users/authSlice";
import orderReducer from "./orders/ordersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
  },
});
