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
      <header className=" top-0 z-10 drop-shadow-xl   dark:bg-darkSecondary bg-lightSecondary text-white sticky">
        <section className="mx-auto max-w-6xl p-4 flex justify-between items-center ">
          <Link className="text-3xl font-extrabold sm:text-4xl" to="/">
            Plexiglass
          </Link>
          <div className="hidden md:flex gap-5 text-xl  font-bold  px-6">
            <Link to="/">View Todays Orders</Link>
            <Link to="/">Add new Orders</Link>
            {user ? (
              <button
                className="bg-orange-600  hover:bg-blue-600 w-24 text-center   rounded-md"
                onClick={handleLogout}
                to="/login"
              >
                Logout
              </button>
            ) : (
              <Link
                className="bg-orange-600  hover:bg-blue-600 w-24 text-center   rounded-md"
                to="/login"
              >
                Login
              </Link>
            )}
            <p className="text-orange-400 text-base underline">
              Logged in as : {user ? <> {user.userName}</> : ""}
            </p>
          </div>
          <div onClick={handleNav} className="md:hidden text-4xl">
            {!nav ? <span>☰</span> : <span>&#120;</span>}
          </div>
        </section>
        <div
          className={
            !nav
              ? "hidden"
              : "absolute md:hidden h-screen  flex flex-col justify-center text-center mx-auto text-4xl gap-10   w-full dark:bg-darkSecondary   bg-lightSecondary text-white"
          }
        >
          <Link to="/">View Todays Orders</Link>
          <Link to="/">Add new Orders</Link>
          <Link to="/">Login</Link>
          <Link to="/">Logout</Link>
        </div>
      </header>
    </>
  );
};
