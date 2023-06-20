import { AllOrdersTable } from "../components/AllOrdersTable";

export const ViewAllOrders = () => {
  return (
    <>
      <section className="container mx-auto  max-w-full  z-10 text-white h-full ">
        <p className="text-center text-2xl font-bold">All orders Detals</p>
        <div className="bg-darkSecondary drop-shadow-xl flex items-center h-16 p-4 ">
          <input
            type="text"
            className="bg-transparent h-9 border border-gray-300  rounded-md"
            placeholder="search order no"
            autoFocus
          ></input>
        </div>
        <div className="m-10">
          <AllOrdersTable />
        </div>
      </section>
    </>
  );
};
