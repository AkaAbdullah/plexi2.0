import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../redux/orders/ordersSlice";
import { Spinner } from "../components/Spinner";

export const AllOrdersTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(getAllOrders());
    console.log(orders);
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleViewClick = (row) => {
    console.log("View button clicked for ID:", row.name);
    openModal();
  };

  const columns = [
    {
      name: "orderNo",
      selector: (row) => row.orderNo,
      sortable: true,
      maxWidth: "200px",
      minWidth: "200px",
    },
    {
      name: "Order Details",
      cell: (row) => (
        <div>
          <table className="flex gap-5 flex-col">
            <thead className="gap-5">
              <tr className="gap-5">
                <th>Thickness</th>
                <th>Length</th>
                <th>Width</th>
                <th>Diameter</th>
              </tr>
            </thead>
            <tbody>
              {row.orderDetails.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.thickness}</td>
                  <td>{detail.length}</td>
                  <td>{detail.width}</td>
                  <td>{detail.diameter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    // {
    //   name: "Thickness",
    //   selector: (row) => row.orderDetails.length,
    //   maxWidth: "200px",
    //   minWidth: "200px",
    // },
    // {
    //   name: "Length & F Value",
    //   selector: (row) => row.id,
    //   maxWidth: "200px",
    //   minWidth: "200px",
    // },
    // {
    //   name: "Width & F Value",
    //   selector: (row) => row.address.street,
    //   maxWidth: "200px",
    //   minWidth: "200px",
    // },
    // {
    //   name: "Diameter & F Value",
    //   selector: (row) => row.address.city,
    //   maxWidth: "200px",
    //   minWidth: "200px",
    // },
    // {
    //   name: "Price",
    //   selector: (row) => row.address.zipcode,
    //   maxWidth: "200px",
    //   minWidth: "200px",
    // },
    // {
    //   name: "Tracking",
    //   selector: (row) => row.address.suite,
    //   maxWidth: "200px",
    //   minWidth: "200px",
    // },
    // {
    //   name: "Date",
    //   selector: (row) => row.username,
    //   maxWidth: "203px",
    //   minWidth: "203px",
    // },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <>
    //       <button
    //         popovertarget="popever"
    //         className=" bg-blue-500 h-9 w-20 mr-3 hover:bg-blue-700 "
    //         onClick={() => handleViewClick(row)}
    //       >
    //         View
    //       </button>
    //       <button
    //         className="bg-blue-500 h-9 w-24 hover:bg-blue-700 "
    //         onClick={() => console.log("loru")}
    //       >
    //         Update
    //       </button>
    //     </>
    //   ),
    // },
  ];

  const customStyles = {
    tableWrapper: {
      style: {
        overflow: "none",
        width: "100%",
      },
    },
    table: {
      style: {
        border: "1px solid #ddd",
      },
    },
    rows: {
      style: {
        minHeight: "52px", // override the row height
        fontSize: "20px",
        // backgroundColor: "#3f3f46",
        color: "white",
        "&:hover": {
          backgroundColor: "#71717a",
        },
      },
    },
    headCells: {
      style: {
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bolder",
        backgroundColor: "#262424",
        color: "#fff",
      },
    },
    cells: {
      style: {
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  };

  // setting the spinner size
  const styles = {
    height: "200",
    width: "200",
  };

  if (isLoading) {
    return <Spinner styles={styles} />;
  }
  return (
    <>
      {orders && orders.length > 0 ? (
        <DataTable
          columns={columns}
          data={orders}
          pagination
          customStyles={customStyles}
          theme="dark"
        />
      ) : (
        <p>No orders found.</p>
      )}
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};
