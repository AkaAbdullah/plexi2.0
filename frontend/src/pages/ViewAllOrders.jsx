import { AllOrdersTable } from "../components/AllOrdersTable";
import { useSelector } from "react-redux";
export const ViewAllOrders = () => {
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <>
      <section className="container mx-auto  max-w-full  z-10 text-white h-full ">
        <p
          className={`text-center text-2xl ${
            darkMode ? "" : "text-black"
          } font-bold`}
        >
          All orders Details
        </p>

        <div className="">
          <section className="max-w-fit mx-auto">
            <AllOrdersTable />
          </section>
        </div>
      </section>
    </>
  );
};
