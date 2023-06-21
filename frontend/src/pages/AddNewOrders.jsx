import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AddNewOrders = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="container mx-auto max-w-6xl p-4 h-screen z-10 text-center text-white">
        <p className="text-2xl font-bold">Create New Orders</p>
        <p>Please add space or line break between order numbers</p>
        <p className="bg-red-700">Please do not add custom cut Orders here</p>
        <div className="mt-10 flex flex-col items-center gap-7 ">
          <textarea
            className="w-80  h-64 bg-transparent"
            placeholder="5989938833&#10;5000978763&#10;5000083733"
            autoFocus
            onChange={(e) => setOrderNumbers(e.target.value)}
          ></textarea>
          <button
            onClick={handleSubmit}
            className="bg-orange-600 w-80 hover:bg-slate-500 h-14 text-xl font-bold"
          >
            Save Orders
          </button>
        </div>
      </section>
    </>
  );
};
