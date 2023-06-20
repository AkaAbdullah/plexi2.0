import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../Zustand/useAuthStore";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
            {isLoggedIn ? (
              <Link onClick={handleLogout} to="/login">
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
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
