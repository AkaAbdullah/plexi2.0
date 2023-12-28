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

  //checking if the user is loggedin or not
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);

  const [roles, setRoles] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(CountOrders());
      setRoles(user.roles[0]);
    } else {
      navigate("/login");
    }
  }, []);

  //checking if the user roles in admin or sueper user

  const checkRoles = () => {
    if (roles === "superUser") {
      navigate("/admin");
    } else {
      toast.error("not Authorized");
    }
  };

  const checkRoles2 = () => {
    if (roles === "superUser") {
      navigate("/genrateorders");
    } else {
      toast.error("not Authorized");
    }
  };

  //styles for spinner
  const styles = {
    height: "40",
    width: "40",
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <section className=" mx-auto py-6 z-10  text-white container sm:h-fit  lg:h-screen max-w-6xl flex items-center justify-between flex-wrap sm:flex  sm:items-center sm:gap-9 sm:justify-center  lg:justify-around ">
        <Link to="/addnew">
          <div
            className={`rounded-[12px] ${
              darkMode ? "hover:bg-slate-700" : "hover:bg-blue-500"
            }  ${
              darkMode ? "bg-darkSecondary" : "bg-blue-700"
            }   h-64 drop-shadow-xl flex flex-col   justify-center items-center   w-72`}
          >
            <p className="text-3xl"> + Add new Orders</p>
          </div>
        </Link>
        <Link to="/update">
          <div
            className={`rounded-[12px] ${
              darkMode ? "hover:bg-slate-700" : "hover:bg-blue-500"
            }  ${
              darkMode ? "bg-darkSecondary" : "bg-blue-700"
            }   h-64 drop-shadow-xl flex flex-col   justify-center items-center   w-72`}
          >
            <p className="text-3xl">Update Orders</p>
          </div>
        </Link>
        <Link to="/allorders">
          <div
            className={`rounded-[12px] ${
              darkMode ? "hover:bg-slate-700" : "hover:bg-blue-500"
            }  ${
              darkMode ? "bg-darkSecondary" : "bg-blue-700"
            }   h-64 drop-shadow-xl flex flex-col   justify-center items-center   w-72`}
          >
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
                  <span>⚠️</span>
                )}
              </p>
            )}

            <p className="text-2xl mt-5">View All</p>
          </div>
        </Link>
        <button onClick={checkRoles2}>
          <div
            className={`rounded-[12px] ${
              darkMode ? "hover:bg-slate-700" : "hover:bg-blue-500"
            }  ${
              darkMode ? "bg-darkSecondary" : "bg-blue-700"
            }   h-64 drop-shadow-xl flex flex-col   justify-center items-center   w-72`}
          >
            <p className="text-3xl">Custom Cut Printer Report</p>
          </div>
        </button>
        <Link to="/sales">
          <div
            className={`rounded-[12px] ${
              darkMode ? "hover:bg-slate-700" : "hover:bg-blue-500"
            }  ${
              darkMode ? "bg-darkSecondary" : "bg-blue-700"
            }   h-64 drop-shadow-xl flex flex-col   justify-center items-center   w-72`}
          >
            <p className="text-3xl">Charts</p>
          </div>
        </Link>

        <button onClick={checkRoles}>
          <div
            className={`rounded-[12px] ${
              darkMode
                ? " bg-blue-700 hover:bg-blue-500"
                : " bg-yellow-500 hover:bg-yellow-700"
            }     h-64 drop-shadow-xl flex flex-col   justify-center items-center   w-72`}
          >
            <p className="text-3xl">Admin Panel</p>
          </div>
        </button>
      </section>
    </>
  );
};
