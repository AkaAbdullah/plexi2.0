import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";

import { getAllOrders } from "../redux/orders/ordersSlice";
import { Spinner } from "../components/Spinner";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import toast, { Toaster } from "react-hot-toast";

import { CompleteMArkOrder } from "../redux/orders/ordersSlice";

export const AllOrdersTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { orders, isLoading, isError } = useSelector((state) => state.orders);
  const { darkMode } = useSelector((state) => state.theme);

  const { user } = useSelector((state) => state.auth);

  // Search by date
  const [showDate, setShowDate] = useState("");

  const handleDateSearch = (e) => {
    const result = orders.filter((row) => {
      return row.createdAt.includes(showDate.toString());
    });
    setSearch(result);
  };

  // Searching the order
  const [search, setSearch] = useState([]);

  //pasing to modal
  const updateSearch = (updatedSearch) => {
    setSearch(updatedSearch);
  };

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

  //seding data to modal
  const [modelData, setModalData] = useState([]);
  const handleViewClick = (row) => {
    setModalData(row);
    console.log("View button clicked for ID:", row.orderNo);
    openModal();
  };

  const completeMark = (id) => {
    dispatch(CompleteMArkOrder(id));
    toast.success("Order Complete Marked Successfully");
    const updatedOrders = search.map((order) => {
      if (order._id === id) {
        return { ...order, completeMarked: true };
      }
      return order;
    });
    setSearch(updatedOrders);
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
      name: "ID",
      selector: (row) => row.marketPlaceOrderId,
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
                  
                 
                  
                  <td className="flex-grow  w-28 h-12">{detail.thickness}</td>
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
            className=" bg-blue-700 h-9 w-20 mr-3 rounded-sm hover:bg-blue-800 "
            onClick={() => handleViewClick(row)}
          >
            View
          </button>
          <button
            className={`bg-blue-700 h-9 w-28 rounded-sm hover:bg-blue-800 ${
              row.completeMarked
                ? "opacity-40  bg-slate-500 cursor-not-allowed"
                : ""
            }`}
            onClick={() => completeMark(row._id)}
            disabled={row.completeMarked}
          >
            Complete
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
        backgroundColor: "#3f3f46",
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
    height: "150",
    width: "150",
  };

  if (isLoading) {
    return <Spinner styles={styles} />;
  }
  if (isError) {
    return <p>Not Authenticated</p>;
  }

  //Generate PDF code
  const generatePDF = () => {
    const doc = new jsPDF();

    const fractionRegex = /\b(\d+\/\d+)\b/; // Regular expression to match fractions

    const tableData = search.map((row) => {
      const rowData = [];
      row.orderDetails.forEach((detail, index) => {
        const detailRow = [
          "",
          detail.thickness ? detail.thickness.toString() : "",
          getFormattedValue(detail.length),
          getFormattedValue(detail.width),
          getFormattedValue(detail.diameter),
          detail.quantity ? detail.quantity.toString() : "",
        ];

        if (index === 0) {
          detailRow[0] = row.orderNo;
        }

        rowData.push(detailRow);
      });

      return rowData;
    });

    const flattenedData = [].concat(...tableData);

    //Getting Current Date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;

    // Add line at the top of the table
    const tableStartY = 10; // Adjust the vertical position as needed
    const lineThickness = 0.1; // Line thickness in mm
    doc.setLineWidth(lineThickness);
    doc.setDrawColor(0, 0, 0); // Set line color
    doc.line(
      10,
      tableStartY,
      doc.internal.pageSize.getWidth() - 10,
      tableStartY
    ); // Draw the line

    // Add text below the line
    const text = "Plexiglass orders details";
    const textX = 10; // Adjust the horizontal position as needed
    const textY = tableStartY + lineThickness + 5; // Adjust the vertical position as needed
    doc.setFontSize(12); // Set font size for the text
    doc.text(text, textX, textY); // Draw the text

    const textX2 = 164; // Adjust the horizontal position as needed
    const textY2 = tableStartY + lineThickness + 5; // Adjust the vertical position as needed
    doc.setFontSize(12); // Set font size for the text
    doc.text("Date : " + showDate, textX2, textY2); // Draw the text

    // Add line below the text
    const lineBelowTextY = textY + 2; // Adjust the vertical position as needed
    doc.setLineWidth(lineThickness);
    doc.line(
      10,
      lineBelowTextY,
      doc.internal.pageSize.getWidth() - 10,
      lineBelowTextY
    ); // Draw the line

    doc.autoTable({
      head: [
        [
          "Order",
          "Thickness",
          "Length & F-Value",
          "Width & F-Value",
          "Diameter & F-Value",
          "Quantity",
        ],
      ],
      body: flattenedData,
      startY: lineBelowTextY + lineThickness + 5, // Adjust the vertical position to leave space below the line
    });

    // Add line at the end of the table
    const tableEndY = doc.previousAutoTable.finalY + 10; // Adjust the vertical position as needed
    doc.setLineWidth(lineThickness);
    doc.line(10, tableEndY, doc.internal.pageSize.getWidth() - 10, tableEndY); // Draw the line

    // Add text below the line
    const additionalText = "https://fabplexiv-2.netlify.app/";
    const additionalTextY = tableEndY + lineThickness + 3; // Adjust the vertical position as needed
    doc.setFontSize(9); // Set font size for the text
    doc.text(additionalText, 10, additionalTextY); // Draw the text

    //user info adding inf pdf
    const userInfoTextX = `PDF generated by UID : ${user._id} `;
    const userInfoTextY = tableEndY + lineThickness + 3; // Adjust the vertical position as needed
    doc.setFontSize(9); // Set font size for the text
    doc.text(userInfoTextX, 122, userInfoTextY); // Draw the text

    doc.save("Plexi Orders Details " + formattedDate);

    // Function to extract and format value
    function getFormattedValue(value) {
      if (typeof value === "string") {
        const fractionMatch = value.match(fractionRegex);
        if (fractionMatch) {
          const [whole, fraction] = value.split(" ");
          const [numerator, denominator] = fractionMatch[0].split("/");
          const decimal = parseFloat(numerator) / parseFloat(denominator);
          return `${whole} ${fraction} `;
        }
      }
      return value ? value.toString() : "";
    }
  };
  // return `${whole} ${fraction} D-Val :  ${decimal.toFixed(3)}`;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-darkSecondary drop-shadow-xl border sm:flex-col sm:h-fit sm:gap-5 border-white text-white lg:flex lg:flex-row items-center lg:h-16 p-4 ">
        <input
          type="text"
          className="bg-transparent h-9 border border-gray-300  rounded-sm"
          placeholder="search order no"
          autoFocus
          onChange={handleSearch}
        ></input>
        <div className="flex   sm:flex-row">
          <input
            className="text-white rounded-sm bg-blue-700  ml-5 h-10 text-xl  "
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
            className="bg-blue-700 lg:w-32 sm:w-24 h-10 ml-5 rounded-sm hover:bg-blue-800"
          >
            Search
          </button>
          <button
            onClick={generatePDF}
            className="bg-blue-700 lg:w-32 sm:w-24 h-10 ml-5 rounded-sm hover:bg-blue-800"
          >
            Generate PDF
          </button>
        </div>
      </div>

      {orders && orders.length > 0 ? (
        <DataTable
          columns={columns}
          data={search}
          pagination
          paginationPerPage={30}
          customStyles={customStyles}
          theme={darkMode ? "dark" : "light"}
        />
      ) : (
        <p>No orders found.</p>
      )}

      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        data={modelData}
        updateSearch={updateSearch}
        search={search}
      />
    </>
  );
};
