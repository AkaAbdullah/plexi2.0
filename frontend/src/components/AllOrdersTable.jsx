import DataTable from "react-data-table-component";
import fetchOrdersFunc from "../Zustand/AllOrdersApiCall";
import { useEffect } from "react";

export const AllOrdersTable = () => {
  const { isLoading, isError, message, isSuccess } = fetchOrdersFunc();

  useEffect(() => {}, []);

  const columns = [
    {
      name: "orderNo",
      selector: (row) => row.name,
      sortable: true,
      style: {
        maxWidth: "150px", // Adjust the maximum width of the column
      },
    },
    {
      name: "Thickness",
      selector: (row) => row.email,
      style: {
        maxWidth: "150px", // Adjust the maximum width of the column
      },
    },
    {
      name: "Length and Fraction Value",
      selector: (row) => row.age,
    },
    {
      name: "Width and Fraction Value",
      selector: (row) => row.age,
    },
    {
      name: "Diameter and Fraction Value",
      selector: (row) => row.age,
    },
    {
      name: "Price",
      selector: (row) => row.age,
    },
    {
      name: "Tracking ",
      selector: (row) => row.age,
    },
    {
      name: "Date ",
      selector: (row) => row.age,
    },
  ];

  const data = [
    {
      id: 1,
      name: "ali",
      email: "al1@gamil.columns",
      age: "32",
    },
    {
      id: 2,
      name: "adsd",
      email: "al1@gamil.columns",
      age: "32sas",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
    },
    {
      id: 3,
      name: "asdsds",
      email: "alsd1@gamil.columns",
      age: "sds",
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
        textAlign: "center",
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      },
    },
    headCells: {
      style: {
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "bolder",
        backgroundColor: "#6b7280",
        color: "#fff",
      },
    },
    cells: {
      style: {
        textAlign: "center",
      },
    },
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        pagination
        customStyles={customStyles}
        striped
        // progressPending={<h1>loading...</h1>}
      />
    </>
  );
};
