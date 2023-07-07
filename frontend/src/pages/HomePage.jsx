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
  const { isLoading, OrderCount, isError } = useSelector(
    (state) => state.orders
  );
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
          <div className=" rounded-[12px] hover:bg-slate-700 bg-darkSecondary h-64 drop-shadow-xl flex flex-col   justify-center items-center   w-72">
            <p className="text-3xl"> + Add new Orders</p>
          </div>
        </Link>
        <Link to="/update">
          <div className="bg-darkSecondary hover:bg-slate-700 rounded-[12px] h-64 drop-shadow-xl flex flex-col justify-center items-center   w-72">
            <p className="text-3xl">Update Orders</p>
          </div>
        </Link>
        <Link to="/allorders">
          <div className="bg-darkSecondary hover:bg-slate-700 rounded-[12px] h-64 drop-shadow-xl flex flex-col justify-center items-center   w-72">
            <p className="text-3xl mb-5">Total Orders Count</p>
            {isLoading ? (
              <Spinner styles={styles} />
            ) : (
              <p className="text-4xl ">
                {isError ? (
                  <span>unable to connect to server</span>
                ) : OrderCount ? (
                  OrderCount.count
                ) : (
                  <span>╳</span>
                )}
              </p>
            )}

            <p className="text-2xl mt-5">View All</p>
          </div>
        </Link>
        <button onClick={checkRoles2}>
          <div className="bg-darkSecondary  hover:bg-slate-700 rounded-[12px] h-64 drop-shadow-xl flex flex-col justify-center items-center   w-72">
            <p className="text-3xl">Generate Orders</p>
          </div>
        </button>
        <Link to="/">
          <div className="bg-darkSecondary rounded-[12px] h-64 drop-shadow-xl hover:bg-slate-700 flex flex-col justify-center items-center   w-72">
            <p className="text-3xl">Experimental</p>
          </div>
        </Link>
        <button onClick={checkRoles}>
          <div className="bg-blue-700 rounded-[12px] hover:bg-blue-800 h-64 drop-shadow-xl flex flex-col justify-center items-center   w-72">
            <p className="text-3xl">Admin Panel</p>
          </div>
        </button>
      </section>
    </>
  );
};
