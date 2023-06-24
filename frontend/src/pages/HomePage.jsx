import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "../components/Spinner";

export const HomePage = () => {
  return (
    <>
      <section className=" mx-auto py-6 z-10 p-4 text-white container  h-screen max-w-6xl flex items-center justify-between flex-wrap sm:flex  sm:items-center ">
        <Link to="/addnew">
          <div className=" rounded-[12px] hover:bg-slate-700 dark:bg-darkSecondary h-64 drop-shadow-xl flex flex-col   justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl"> + Add new Orders</p>
          </div>
        </Link>
        <Link to="/">
          <div className="dark:bg-darkSecondary hover:bg-slate-700 rounded-[12px] h-64 drop-shadow-xl flex flex-col justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl">View Todays Orders</p>
          </div>
        </Link>
        <Link to="/allorders">
          <div className="dark:bg-darkSecondary hover:bg-slate-700 rounded-[12px] h-64 drop-shadow-xl flex flex-col justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl mb-5">Total Orders Count</p>
            <p className="text-4xl"></p>
            <p className="text-2xl mt-5">View All</p>
          </div>
        </Link>
        <Link to="/genrateOrders">
          <div className="dark:bg-darkSecondary  hover:bg-slate-700 rounded-[12px] h-64 drop-shadow-xl flex flex-col justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl">Generate Orders</p>
          </div>
        </Link>
        <Link to="/">
          <div className="dark:bg-darkSecondary rounded-[12px] h-64 drop-shadow-xl hover:bg-slate-700 flex flex-col justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl">Filter Date Wise</p>
          </div>
        </Link>
        <Link to="/admin">
          <div className="dark:bg-orange-500 rounded-[12px] hover:bg-orange-300 h-64 drop-shadow-xl flex flex-col justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl">Admin Panel</p>
          </div>
        </Link>
      </section>
    </>
  );
};
