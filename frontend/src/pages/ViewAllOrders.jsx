import { AllOrdersTable } from "../components/AllOrdersTable";

export const ViewAllOrders = () => {
  return (
    <>
      <section className="container mx-auto  max-w-full  z-10 text-white h-full ">
        <p className="text-center text-2xl font-bold mt-10">
          All orders Details
        </p>

        <div className="m-10">
          <section className="max-w-fit mx-auto">
            <AllOrdersTable />
          </section>
        </div>
      </section>
    </>
  );
};
