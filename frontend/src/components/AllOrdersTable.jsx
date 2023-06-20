import React from "react";
import DataTable from "react-data-table-component";

export const AllOrdersTable = () => {
  const columns = [
    {
      name: "Title",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "age",
      selector: (row) => row.age,
      sortable: true,
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
  return (
    <>
      <DataTable
        className="bg-darkSecondary"
        columns={columns}
        data={data}
        fixedHeader
        pagination
      />
    </>
  );
};
