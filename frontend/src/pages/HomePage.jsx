import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { CountOrders } from "../redux/orders/ordersSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, OrderCount } = useSelector((state) => state.orders);
  //checking if the user roles in admin or sueper user
  const { user } = useSelector((state) => state.auth);

  const [roles, setRoles] = useState("");
  useEffect(() => {
    setRoles(user.roles[0]);
    console.log(roles);
  }, [OrderCount]);

  const checkRoles = () => {
    if (roles === "superUser") {
      navigate("/admin");
    } else {
      toast.error("not Authorized");
    }
  };

  const checkRoles2 = () => {
    if (roles === "superUser") {
      navigate("/admin");
    } else {
      toast.error("not Authorized");
    }
  };

  //styles for spinner
  const styles = {
    height: "40",
    width: "40",
  };

  useEffect(() => {
    dispatch(CountOrders());
    console.log(OrderCount);
  }, []);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <section className=" mx-auto py-6 z-10 p-4 text-white container  h-screen max-w-6xl flex items-center justify-between flex-wrap sm:flex  sm:items-center ">
        <Link to="/addnew">
          <div className=" rounded-[12px] hover:bg-slate-700 dark:bg-darkSecondary h-64 drop-shadow-xl flex flex-col   justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl"> + Add new Orders</p>
          </div>
        </Link>
        <Link to="/update">
          <div className="dark:bg-darkSecondary hover:bg-slate-700 rounded-[12px] h-64 drop-shadow-xl flex flex-col justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl">Update Orders</p>
          </div>
        </Link>
        <Link to="/allorders">
          <div className="dark:bg-darkSecondary hover:bg-slate-700 rounded-[12px] h-64 drop-shadow-xl flex flex-col justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl mb-5">Total Orders Count</p>
            {isLoading ? (
              <Spinner styles={styles} />
            ) : (
              <p className="text-4xl ">{OrderCount.count}</p>
            )}

            <p className="text-2xl mt-5">View All</p>
          </div>
        </Link>
        <button onClick={checkRoles2}>
          <div className="dark:bg-darkSecondary  hover:bg-slate-700 rounded-[12px] h-64 drop-shadow-xl flex flex-col justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl">Generate Orders</p>
          </div>
        </button>
        <Link to="/">
          <div className="dark:bg-darkSecondary rounded-[12px] h-64 drop-shadow-xl hover:bg-slate-700 flex flex-col justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl">Experimental</p>
          </div>
        </Link>
        <button onClick={checkRoles}>
          <div className="dark:bg-orange-600 rounded-[12px] hover:bg-orange-600 h-64 drop-shadow-xl flex flex-col justify-center items-center  bg-lightSecondary w-72">
            <p className="text-3xl">Admin Panel</p>
          </div>
        </button>
      </section>
    </>
  );
};
