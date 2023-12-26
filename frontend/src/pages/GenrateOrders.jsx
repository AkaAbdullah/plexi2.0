import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const GenrateOrders = () => {
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.theme);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="container mx-auto max-w-6xl p-4 h-screen z-10 text-center text-white">
        <p className="text-2xl font-bold">Custom Cut Printing Report</p>
        <p>
          This page is orignally for generating Amazon Orders NOTE: need to
          update routes
        </p>
        {/* <p className="bg-red-700">Please do not add custom cut Orders here</p> */}
      </section>
    </>
  );
};
