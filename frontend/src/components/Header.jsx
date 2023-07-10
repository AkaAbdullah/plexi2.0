import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserFunction, reset } from "../redux/users/authSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    dispatch(logoutUserFunction());
    dispatch(reset());
    navigate("/login");
  };
  //Reset logout state

  return (
    <>
      <header className=" top-0 z-10 drop-shadow-xl   bg-darkSecondary  text-white sticky">
        <section className="mx-auto max-w-6xl p-4 flex justify-between items-center ">
          <Link className="text-3xl font-extrabold sm:text-4xl" to="/">
            Plexiglass
          </Link>
          <div className="hidden md:flex gap-5 text-xl  font-bold  px-6">
            <p className="text-blue-500 text-base underline">
              Logged in as : {user ? <> {user.userName}</> : ""}
            </p>
            {user ? (
              <button
                className="bg-blue-700  hover:bg-blue-800 w-24 text-center   rounded-md"
                onClick={handleLogout}
                to="/login"
              >
                Logout
              </button>
            ) : (
              <Link
                className="bg-blue-700  hover:bg-blue-800 w-24 text-center   rounded-md"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
          <div onClick={handleNav} className="md:hidden text-4xl">
            {!nav ? (
              <span className="cursor-[pointer] ">☰</span>
            ) : (
              <span className="cursor-[pointer] ">&#120;</span>
            )}
          </div>
        </section>
        <div
          className={
            !nav
              ? "hidden"
              : "absolute md:hidden h-screen  flex flex-col justify-center text-center mx-auto text-4xl gap-10   w-full bg-darkSecondary    text-white"
          }
        >
          <Link to="/">View Todays Orders</Link>
          <Link to="/">Add new Orders</Link>

          {user ? <Link to="/">Logout</Link> : <Link to="/">Login</Link>}
        </div>
      </header>
    </>
  );
};
