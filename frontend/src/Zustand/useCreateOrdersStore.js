import { create } from "zustand";
import axios from "axios";

const url = "http://localhost:5000/api/orders/generateorders";
const useCreateOrdersStore = create((set) => ({
  isLoading: false,
  isError: false,
  isCreated: false,

  createOrder: async (orders) => {
    set({ isLoading: true, isError: false });
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(url, orders, { headers });

      if (response.status === 201) {
        set({ isLoading: false, isError: false, isCreated: true });
        console.log("Orders created");
      } else {
        set({ isLoading: false, isError: true, isCreated: false });
        console.log("Failed to create orders");
      }
    } catch (error) {
      set({ isLoading: false, isError: true, isCreated: false });
      console.log("Failed to create orders", error);
    }
  },
}));

export default useCreateOrdersStore;
