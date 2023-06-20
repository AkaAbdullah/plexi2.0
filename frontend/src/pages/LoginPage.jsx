import { useState, useEffect } from "react";
import useAuthStore from "../Zustand/useAuthStore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  //Login User Logic
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { isLoading, isError, isAuthenticated, login } = useAuthStore();

  useEffect(() => {
    if (isError) {
      toast.error("Invalid Credentials ");
    }
    if (isAuthenticated) {
      toast.success("logged in Sucessfully");
      navigate("/");
    }
  }, [isAuthenticated, isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userName, password);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <section className=" text-white mx-auto h-screen max-w-6xl  container flex flex-col justify-center items-center drop-shadow-xl  ">
        <div className="dark:bg-darkSecondary mt-[-150px] bg-lightSecondary w-96 text-white flex flex-col items-center gap-10">
          <p className="text-6xl mt-11">Login</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="text-xl">UserName</label>
            <input
              className=" bg-darkPrimary h-9 border-solid rounded-sm"
              type="text"
              placeholder="User Name"
              autoFocus
              onChange={(e) => setUserName(e.target.value)}
            />
            <label className="text-xl">Password</label>
            <input
              className=" bg-darkPrimary h-9 border-0   rounded-sm"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className=" mb-11 bg-lightSecondary h-9 text-xl  hover:bg-stone-500"
            >
              Login
            </button>
            {isLoading && <p className="text-center mb-5">Loading...</p>}
            {isError && (
              <p className="text-center mb-5">Error while Logging in</p>
            )}
          </form>
        </div>
      </section>
    </>
  );
};
