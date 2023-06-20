import { create } from "zustand";
import axios from "axios";

const url = "http://localhost:5000/api/orders";
const fetchOrdersFunc = create((set) => ({
  isLoading: false,
  isError: false,
  isSuccess: null,
  message: "",

  fetchOrders: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        set({ isLoading: false, isSuccess: response.data });
      } else {
        set({ isError: true, message: "Server did not responded back" });
      }
    } catch (error) {
      set({ isLoading: false, isError: true, message: error.message });
    }
  },
}));

export default fetchOrdersFunc;
