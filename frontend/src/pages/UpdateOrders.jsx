import { useState, useEffect } from "react";

export const UpdateOrders = () => {
  const [updateDiv, setUpdateDiv] = useState(false);

  const handleSearch = () => {
    setUpdateDiv(true);
  };
  return (
    <>
      <section className="mx-auto py-6 max-w-6xl z-10 p-4  h-screen text-white">
        <p className="text-3xl text-center mt-5">Update Order</p>
        <div className="flex gap-10">
          <div className="flex items-center flex-col w-1/2 p-6 border h-fit rounded-md mt-10   ">
            <label className="text-2xl">Enter Order Number</label>
            <input
              className="h-10 mt-5 bg-transparent focus:bg-white w-72 focus:text-black border rounded-md border-teal-100 text-2xl"
              autoFocus
              required
              type="text"
              name="orderNo"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-700 w-72 mt-5 h-12 hover:bg-blue-400"
            >
              Get Details
            </button>
          </div>
          {updateDiv && (
            <div className="flex items-center flex-col w-1/2 p-6 border h-fit rounded-md mt-10   ">
              <label className="text-2xl">Update Tracking & Price</label>
              <input
                className="h-10 mt-5 bg-transparent focus:bg-white w-72 focus:text-black border rounded-md border-teal-100 text-2xl"
                autoFocus
                required
                type="text"
                name="orderNo"
              />
              <button className="bg-blue-700 w-72 mt-5 h-12 hover:bg-blue-400">
                Get Details
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
