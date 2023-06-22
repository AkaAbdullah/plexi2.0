import { AllOrdersTable } from "../components/AllOrdersTable";
import { useState } from "react";

export const ViewAllOrders = () => {
  // const [search, setSearch] = useState(data);

  // const handleSearch = (e) => {
  //   const result = data.filter((row) => {
  //     return row.name.toLowerCase().includes(e.target.value.toLowerCase());
  //   });
  //   setSearch(result);
  // };
  return (
    <>
      <section className="container mx-auto  max-w-full  z-10 text-white h-full ">
        <p className="text-center text-2xl font-bold">All orders Detals</p>

        <div className="m-10">
          <section className="max-w-fit mx-auto">
            <div className="bg-darkSecondary drop-shadow-xl flex items-center h-16 p-4 ">
              <input
                type="text"
                className="bg-transparent h-9 border border-gray-300  rounded-md"
                placeholder="search order no"
                autoFocus
              ></input>
            </div>

            <AllOrdersTable />
          </section>
        </div>
      </section>
    </>
  );
};
