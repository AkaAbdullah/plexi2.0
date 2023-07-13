import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../redux/orders/ordersSlice";
import { getAllOrders } from "../redux/orders/ordersSlice";

export const Modal = ({
  isOpen,
  closeModal,
  className,
  data,
  updateSearch,
  search,
}) => {
  if (!isOpen) {
    return null;
  }

  const modalClasses = `please add some classes to use this`;

  const [updateFormData, setUpdateFormData] = useState({
    shippingCost: "",
    tracking: "",
  });

  const dispatch = useDispatch();

  const handleUpdateOrder = (e) => {
    e.preventDefault();
    dispatch(updateOrder({ id: data._id, ...updateFormData }));
    // Dispatch this order to reflect changes in table
    // dispatch(getAllOrders());
    closeModal();

    const updatedSearch = search.map((order) => {
      if (order._id === data._id) {
        return { ...order, ...updateFormData };
      }
      return order;
    });
    updateSearch(updatedSearch);
  };

  const handleUpdateInput = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s+/g, ""); // Remove all spaces
    setUpdateFormData((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-darkSecondary opacity-70"></div>
        <div className="absolute bg-darkSecondary rounded-md shadow-2xl h-[60%] w-[70%] border flex justify-between p-20  border-l-lightPrimary ">
          <div>
            <h2 className="text-2xl font-bold mb-4">{data.orderNo}</h2>
            <h2 className="text-2xl font-bold mb-4">
              Order Created By : {data.orderCreatedBy.userName}
            </h2>
            <p className="text-xl font-bold mb-4 ">
              Order Created At : {data.createdAt}
            </p>
            <p className="text-xl"> </p>

            <p className="text-xl font-bold mt-5">
              Market Place Order ID : {data.marketPlaceOrderId}
            </p>
            <p className="text-xl font-bold mt-5">
              Tracking no : {data.tracking}
            </p>
            <p className="text-xl font-bold mt-5">
              Complete Marked : {data.completeMarked.toString()}
            </p>
            <p className="text-xl font-bold mt-5">Comments: </p>

            <button
              className="bg-blue-500 w-24 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
          <div>
            <p className="text-2xl font-bold mb-10 ">
              Update Tracking and Price
            </p>
            <form onSubmit={handleUpdateOrder} className="flex flex-col gap-4 ">
              <label className="text-2xl">Shipping Cost</label>
              <input
                className="text-black text-2xl h-10"
                type="text"
                autoFocus
                required
                name="shippingCost"
                onChange={handleUpdateInput}
              />
              <label className="text-2xl">Tracking Number</label>
              <input
                className="text-black text-2xl  h-10"
                type="text"
                name="tracking"
                onChange={handleUpdateInput}
              />
              <button
                type="submit"
                className="bg-blue-600 h-12 hover:bg-blue-800 mt-5"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
