import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../Zustand/useAuthStore";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {}, [user, isAuthenticated]);

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
            {isAuthenticated ? (
              <button
                className="bg-orange-600  hover:bg-teal-500 w-24 text-center   rounded-md"
                onClick={handleLogout}
                to="/login"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
            {isAuthenticated ? (
              <p className="text-orange-400 text-base underline">
                Logged in as : {user}
              </p>
            ) : (
              ""
            )}
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
