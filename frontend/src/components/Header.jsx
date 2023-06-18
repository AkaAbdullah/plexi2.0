import { Link } from "react-router-dom";
import { useState } from "react";
export const Header = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
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
            <Link to="/login">Login</Link>
            <Link to="/">Logout</Link>
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
