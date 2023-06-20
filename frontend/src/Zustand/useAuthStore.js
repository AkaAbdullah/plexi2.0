import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => {
  const storedToken = localStorage.getItem("token");
  const storedUserName = localStorage.getItem("userName");
  const isAuthenticated = !!storedToken; // Check if a token exists

  return {
    user: storedUserName || null, // Set the user state with the stored user name or null if it doesn't exist
    isLoading: false,
    isError: false,
    isAuthenticated,

    login: async (userName, password) => {
      set({ isLoading: true, isError: false });

      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          {
            userName,
            password,
          }
        );

        if (response.status === 200 && response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userName", response.data.userName);
          set({
            user: response.data.userName,
            isLoading: false,
            isAuthenticated: true,
          });
          console.log("Login successful!", response.data);
        } else {
          set({ isLoading: false, isError: true });
          console.error("Login failed. Invalid username or password.");
        }
      } catch (error) {
        set({ isLoading: false, isError: true });
        console.error("Login failed!", error);
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      set({ user: null, isAuthenticated: false });
      console.log("Logged out successfully!");
    },
  };
});

export default useAuthStore;
