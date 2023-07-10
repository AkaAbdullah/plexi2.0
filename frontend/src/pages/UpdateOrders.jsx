import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder } from "../redux/orders/ordersSlice";
import toast, { Toaster } from "react-hot-toast";
import { updateOrder } from "../redux/orders/ordersSlice";
import { Spinner } from "../components/Spinner";

export const UpdateOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [roles, setRoles] = useState("");
  useEffect(() => {
    setRoles(user.roles[0]);
    console.log(roles);
  }, []);

  const {
    singleOrder,
    orderNotFound,
    isLoading,
    isError,
    isSuccess,
    updatedOrder,
  } = useSelector((state) => state.orders);

  const [updateDiv, setUpdateDiv] = useState(false);
  const [orderNo, setOrderNo] = useState("");

  const handleSearch = async () => {
    if (roles === "superUser" && orderNo) {
      setUpdateDiv(true);
      dispatch(getSingleOrder(orderNo));
    } else {
      toast.error("not Authorized");
    }
  };

  //Update form
  const [updateFormData, setUpdateFormData] = useState({
    shippingCost: "",
    tracking: "",
  });

  const handleUpdateOrder = (e) => {
    e.preventDefault();
    dispatch(updateOrder({ id: singleOrder._id, ...updateFormData }));
    console.log(updateFormData);
  };

  useEffect(() => {
    if (isSuccess === true) {
      setUpdateFormData({
        tracking: "",
        shippingCost: "",
      });
      setOrderNo("");
      console.log("order reset");
      window.location.reload(false);
    }
    if (orderNotFound === true) {
      window.location.reload(false);
    }
  }, [updatedOrder, isSuccess, orderNotFound]);

  //input field handle function
  const handleUpdateInput = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //spinner styles
  const styles = {
    height: "50",
    width: "50",
    marginTop: "20px",
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className="mx-auto py-6 max-w-6xl z-10 p-4  h-screen sm:justify-center   text-white">
        <p className="text-3xl text-center mt-5">Update Order</p>
        <div className="flex gap-10 sm:flex sm:flex-col  sm:items-center lg:flex-row ">
          <div className="flex items-center flex-col lg:w-1/2 p-6 border h-fit rounded-md mt-10   ">
            {updateDiv && !singleOrder && isError && <p>Order not Found</p>}
            <label className="text-2xl">Enter Order Number</label>
            <input
              className="h-10 mt-5 bg-transparent focus:bg-white w-72 focus:text-black border rounded-md border-teal-100 text-2xl"
              autoFocus
              required
              type="text"
              name="orderNo"
              onChange={(e) => setOrderNo(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-700 text-xl w-72 mt-5 h-12 hover:bg-blue-400"
            >
              Get Details
            </button>
          </div>
          {updateDiv && singleOrder && (
            <div className="flex items-center flex-col lg:w-1/2 p-6 border h-fit rounded-md mt-10   ">
              <p className="text-2xl">Update Order : {singleOrder.orderNo}</p>
              <form
                onSubmit={handleUpdateOrder}
                className="flex flex-col gap-2"
              >
                <label className="text-xl mt-5">Shipping cost</label>
                <input
                  className="h-10 mt-2 bg-transparent focus:bg-white w-72 focus:text-black border rounded-md border-teal-100 text-2xl"
                  autoFocus
                  required
                  type="text"
                  name="shippingCost"
                  onChange={handleUpdateInput}
                />
                <label className="text-xl mt-2">Tracking Number</label>
                <input
                  className="h-10 mt-2 bg-transparent focus:bg-white w-72 focus:text-black border rounded-md border-teal-100 text-2xl"
                  autoFocus
                  required
                  type="text"
                  name="tracking"
                  onChange={handleUpdateInput}
                />
                <button
                  type="submit"
                  className="bg-blue-700 w-72 mt-5 h-12 text-xl hover:bg-blue-400"
                >
                  Update
                </button>
              </form>
              {isLoading && <Spinner styles={styles} />}
              {isError && <p className="mt-4">Failed to update Order</p>}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
