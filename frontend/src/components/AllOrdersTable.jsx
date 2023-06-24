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
        <div className="flex flex-col items-center gap-4">
          <table>
            <thead>
              <tr className="flex gap-10">
                <th className="flex-grow  w-32 ">Thickness</th>
                <th className="flex-grow  w-32">Length</th>
                <th className="flex-grow text-center w-32 ">Width</th>
                <th className="flex-grow w-32">Diameter</th>
                <th className="flex-grow w-32">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {row.orderDetails.map((detail, index) => (
                <tr key={index} className="flex gap-10  ">
                  <td className="flex-grow  w-32 h-12 ">{detail.thickness}</td>
                  <td className="flex-grow w-32">{detail.length}</td>
                  <td className="flex-grow w-32 ">{detail.width}</td>
                  <td className="flex-grow w-32">{detail.diameter}</td>
                  <td className="flex-grow w-32">{detail.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },

    {
      name: "Tracking No",
      selector: (row) => row.tracking,
      maxWidth: "200px",
      minWidth: "200px",
    },
    {
      name: "Cost",
      selector: (row) => row.shippingCost,
      maxWidth: "200px",
      minWidth: "200px",
    },
    {
      name: "Date",
      selector: (row) => row.createdAt,
      maxWidth: "200px",
      minWidth: "200px",
    },

    {
      name: "Action",
      maxWidth: "200px",
      minWidth: "200px",
      cell: (row) => (
        <>
          <button
            className=" bg-blue-500 h-9 w-20 mr-3 hover:bg-blue-700 "
            onClick={() => handleViewClick(row)}
          >
            View
          </button>
          <button
            className="bg-blue-500 h-9 w-24 hover:bg-blue-700 "
            onClick={() => console.log("loru")}
          >
            Update
          </button>
        </>
      ),
    },
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

  // setting the spinner size props
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
