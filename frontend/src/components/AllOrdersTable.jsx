import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../redux/orders/ordersSlice";
import { Spinner } from "../components/Spinner";

export const AllOrdersTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { orders, isLoading, isError } = useSelector((state) => state.orders);

  // Search by date
  const [showDate, setShowDate] = useState("");

  const handleDateSearch = () => {};

  // Searching the order
  const [search, setSearch] = useState([]);

  const handleSearch = (e) => {
    const result = orders.filter((row) => {
      return row.orderNo.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(result);
  };

  useEffect(() => {
    setSearch(orders);
    dispatch(getAllOrders());
  }, []);

  useEffect(() => {
    setSearch(orders);
  }, [orders, showDate]);

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
      name: "OrderNo",
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
                <th className="flex-grow  w-28 ">Thickness</th>
                <th className="flex-grow  w-28">Length</th>
                <th className="flex-grow text-center w-28 ">Width</th>
                <th className="flex-grow w-28">Diameter</th>
                <th className="flex-grow w-28">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {row.orderDetails.map((detail, index) => (
                <tr key={index} className="flex gap-10  ">
                  <td className="flex-grow  w-28 h-12 ">{detail.thickness}</td>
                  <td className="flex-grow w-28">{detail.length}</td>
                  <td className="flex-grow w-28 ">{detail.width}</td>
                  <td className="flex-grow w-28">{detail.diameter}</td>
                  <td className="flex-grow w-28">{detail.quantity}</td>
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
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.createdAt,
      maxWidth: "200px",
      minWidth: "200px",
      sortable: true,
    },

    {
      name: "Action",
      maxWidth: "200px",
      minWidth: "200px",
      cell: (row) => (
        <>
          <button
            className=" bg-orange-500 h-9 w-20 mr-3 hover:bg-blue-700 "
            onClick={() => handleViewClick(row)}
          >
            View
          </button>
          <button
            className="bg-orange-500 h-9 w-20 hover:bg-blue-700 "
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
  if (isError) {
    return <p>Not Authenticated</p>;
  }

  return (
    <>
      <div className="bg-darkSecondary drop-shadow-xl text-white flex items-center h-16 p-4 ">
        <input
          type="text"
          className="bg-transparent h-9 border border-gray-300  rounded-md"
          placeholder="search order no"
          autoFocus
          onChange={handleSearch}
        ></input>
        <div>
          <input
            className="text-white rounded-md bg-orange-500  ml-5 h-10 text-xl  "
            type="date"
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const formattedDate = selectedDate
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })
                .replace(/\//g, "-");
              setShowDate(formattedDate);
            }}
          />
          <button
            onClick={handleDateSearch}
            className="bg-orange-500 w-32 h-10 ml-5 hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      {orders && orders.length > 0 ? (
        <DataTable
          columns={columns}
          data={search}
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
