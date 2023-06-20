import { create } from "zustand";
import axios from "axios";

const url = "http://localhost:5000/api/orders/count";

const countOrders = create((set) => ({
  isLoading: false,
  isError: false,
  totalCount: "",

  count: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        set({ isLoading: false, isError: false, totalCount: response.data });
      } else {
        console.log("unable to fetch orders");
      }
    } catch (error) {
      set({ isLoading: false, isError: true });
    }
  },
}));

export default countOrders;
