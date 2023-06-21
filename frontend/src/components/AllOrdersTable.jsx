import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axios from "axios";

export const AllOrdersTable = () => {
  const [data1, setData] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setData(response.data);
      console.log(data1);
    };
    apiCall();
  }, []);

  const columns = [
    {
      name: "orderNo",
      selector: (row) => row.name,
      sortable: true,
      maxWidth: "200px",
      minWidth: "200px",
    },
    {
      name: "Thickness",
      selector: (row) => row.email,
      maxWidth: "200px",
      minWidth: "200px",
    },
    {
      name: "Length & F Value",
      selector: (row) => row.id,
      maxWidth: "200px",
      minWidth: "200px",
    },
    {
      name: "Width & F Value",
      selector: (row) => row.address.street,
      maxWidth: "200px",
      minWidth: "200px",
    },
    {
      name: "Diameter & F Value",
      selector: (row) => row.address.city,
      maxWidth: "200px",
      minWidth: "200px",
    },
    {
      name: "Price",
      selector: (row) => row.address.zipcode,
      maxWidth: "200px",
      minWidth: "200px",
    },
    {
      name: "Tracking",
      selector: (row) => row.address.suite,
      maxWidth: "200px",
      minWidth: "200px",
    },
    {
      name: "Date",
      selector: (row) => row.username,
      maxWidth: "203px",
      minWidth: "203px",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="bg-blue-500 h-9 w-20 mr-3 hover:bg-blue-700 "
            onClick={() => console.log("loru")}
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
        width: "10  0%",
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

  return (
    <>
      <DataTable
        columns={columns}
        data={data1}
        pagination
        customStyles={customStyles}
        // striped
        theme="dark"
      />
    </>
  );
};
