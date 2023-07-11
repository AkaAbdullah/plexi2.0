import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserFunction, reset } from "../redux/users/authSlice";
import { Spinner } from "../components/Spinner";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error("Failed to login invalid username or password");
    }

    if (isSuccess || user) {
      navigate("/");
      window.location.reload(false);
    }
  }, [isError, user, navigate, isSuccess, message, dispatch]);

  //Login User Logic
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { userName, password } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !password) {
      toast.error("Please enter a username and password");
      return;
    }
    const userLoginData = {
      userName,
      password,
    };
    dispatch(loginUserFunction(userLoginData));
  };

  const styles = {
    height: "40",
    width: "40",
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <section className=" text-white mx-auto h-screen max-w-6xl  container flex flex-col justify-center items-center drop-shadow-xl  ">
        <div className="bg-darkSecondary mt-[-150px]  w-3/6 h-3/6 text-white flex flex-col items-center gap-10">
          <p className="text-6xl mt-11">Login</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="text-2xl">
              UserName <span className="text-xl">(case sensitive)</span>
            </label>
            <input
              className=" bg-darkPrimary h-12 w-80 border-solid text-2xl rounded-sm"
              type="text"
              placeholder="User Name"
              autoFocus
              name="userName"
              onChange={handleChange}
            />
            <label className="text-2xl">Password</label>
            <input
              className=" bg-darkPrimary h-12 text-2xl border-0   rounded-sm"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
            <button
              type="submit"
              className=" mb-11 bg-blue-700 h-12 text-xl  hover:bg-stone-500"
            >
              Login
            </button>
            <div className="flex items-center justify-center mb-5 mt-[-40px]">
              {isLoading && <Spinner styles={styles} />}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
