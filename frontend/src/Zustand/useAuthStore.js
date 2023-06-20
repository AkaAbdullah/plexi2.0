import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  isLoading: false,
  error: null,

  login: async (userName, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { userName, password }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);

      set({ token, user, isLoading: false });
    } catch (error) {
      set({ error: "Login failed", isLoading: false });
      console.error(error);
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
  isLoggedIn: () => !!localStorage.getItem("token"),
}));

export default useAuthStore;
