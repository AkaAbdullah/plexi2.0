import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Modal from "react-modal";
import IMAGES from "../assets/images";

export const GenrateOrders = () => {
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.theme);

  const [orderNoFromPC, setOrderNoFromPC] = useState([]);

  const fileInputRef = useRef(null);

  const handleFileChange0 = () => {
    if (fileInputRef.current) {
      const input = fileInputRef.current;
      const files = input.files;

      if (files.length > 0) {
        // Extracting file names and storing them in an array
        setOrderNoFromPC((prevOrderNoFromPC) =>
          Array.from(files).map((file) => file.name)
        );
      } else {
        console.log("No files selected");
      }
    } else {
      console.error("fileInputRef is null");
    }
  };
  useEffect(() => {}, [orderNoFromPC]);

  // the code for CSV file reading here
  const [selectedColumn, setSelectedColumn] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Parse CSV file
    Papa.parse(file, {
      complete: (result) => {
        if (result.data.length > 0) {
          const columnToExtract = "Document Name"; // Replace with the actual column name you want to extract

          // Find the index of the column by name in the header row
          const columnIndex = result.data[0].indexOf(columnToExtract);

          if (columnIndex !== -1) {
            // Extract the values from the specified column and filter out undefined values
            const extractedColumn = result.data
              .slice(1) // Exclude header row
              .map((row) => row[columnIndex])
              .filter((value) => value !== undefined);

            setSelectedColumn(extractedColumn);
            console.log(selectedColumn);
          } else {
            console.error("Column not found in CSV file");
          }
        } else {
          console.error("CSV file is empty");
        }
      },
      header: false,
    });
  };
  // here the code for the comprison of the two states
  const [diff, setDiff] = useState([]);
  const [commonValues, setCommonValues] = useState([]);

  const calulateDifference = () => {
    const difer = orderNoFromPC.filter(
      (item) => !selectedColumn.includes(item.toString())
    );
    const counts = {};
    selectedColumn.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });

    const repeatedValues = Object.keys(counts).filter(
      (item) => counts[item] > 1
    );

    setCommonValues(repeatedValues);
    setDiff(difer);
  };

  //this code is for genrating PDF file
  const generatePDF = () => {
    //Getting Current Date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    // minus 1 becuase the print report is calculated on next day
    const formattedDate = `${day - 1}-${month}-${year}`;
    const doc = new jsPDF();
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
    const text = "Ohio Printing Report ";
    const textX = 10; // Adjust the horizontal position as needed
    const textY = tableStartY + lineThickness + 5; // Adjust the vertical position as needed
    doc.setFontSize(12); // Set font size for the text
    doc.text(text, textX, textY); // Draw the text

    const textX2 = 164; // Adjust the horizontal position as needed
    const textY2 = tableStartY + lineThickness + 5; // Adjust the vertical position as needed
    doc.setFontSize(12); // Set font size for the text
    doc.text("Date : " + formattedDate, textX2, textY2); // Draw the text

    // Add line below the text
    const lineBelowTextY = textY + 2; // Adjust the vertical position as needed
    doc.setLineWidth(lineThickness);
    doc.line(
      10,
      lineBelowTextY,
      doc.internal.pageSize.getWidth() - 10,
      lineBelowTextY
    ); // Draw the line

    const moreText = `Total Orders Processed : ${orderNoFromPC.length}`;
    const moreTextX = 10; // Adjust the horizontal position as needed
    const moreTextY = lineBelowTextY + lineThickness + 5; // Adjust the vertical position as needed

    doc.setFontSize(12); // Set font size for the additional text
    doc.text(moreText, moreTextX, moreTextY); // Draw the additional text

    const more2 = `Total Orders Printed : ${selectedColumn.length}`;
    const more2X = 10; // Adjust the horizontal position as needed
    const more2Y = lineBelowTextY + lineThickness + 10; // Adjust the vertical position as needed

    doc.setFontSize(12); // Set font size for the additional text
    doc.text(more2, more2X, more2Y); // Draw the additional text

    const more3 = `Difference : ${
      orderNoFromPC.length - selectedColumn.length
    }`;
    const more3X = 10; // Adjust the horizontal position as needed
    const more3Y = lineBelowTextY + lineThickness + 15; // Adjust the vertical position as needed

    doc.setFontSize(12); // Set font size for the additional text
    doc.text(more3, more3X, more3Y); // Draw the additional text

    const tableHeaders = [
      "Orders Processed",
      "Orders Printed",
      "Not Printed ",
      "Double Printed ",
    ];
    const tableData = orderNoFromPC.map((_, index) => [
      orderNoFromPC.sort()[index],
      selectedColumn.sort()[index],
      diff[index],
      commonValues[index],
    ]);

    doc.autoTable({
      startY: tableStartY + 30,
      head: [tableHeaders],
      body: tableData,
      theme: "grid", // Use 'grid', 'striped', 'plain', 'css' or provide your own theme object
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

    doc.save("Ohio Printing Report " + formattedDate);
  };

  // Tutorial section
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    IMAGES.img1,
    IMAGES.img2,
    IMAGES.img3,
    IMAGES.img4,
    IMAGES.img5,
    IMAGES.img6,
    IMAGES.img7,
    IMAGES.img8,
    IMAGES.img9,
    IMAGES.img10,
    IMAGES.img11,
    IMAGES.img12,
    IMAGES.img13,
    IMAGES.img14,
  ];
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };
  const switchToNextImage = () => {
    nextImage();
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "1200px", // Set your custom width
      maxHeight: "800px", // Set your custom height
    },
  };

  return (
    <>
      <section className="container mx-auto max-w-6xl p-4 h-full z-10 text-start text-white">
        <p className="text-3xl font-bold">Custom Cut Printing Report</p>
        <p>
          This page is orignally for generating Amazon Orders NOTE: need to
          update routes from backend
        </p>
        <p>
          The Data is not stored in Database only performs calculations on
          rutime only
        </p>
        <p>NOTE: The page doesnot support D-mode</p>
        <p className="text-xl bg-yellow-500 w-[420px] font-medium rounded-sm p-1">
          Please Watch Tutorial Before procedding
        </p>
        <div>
          <button
            onClick={openModal}
            className="bg-blue-500 rounded-sm p-2 mt-2 text-xl hover:bg-blue-900"
          >
            Watch Tutorial
          </button>

          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Image Modal"
            style={customStyles}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>

            <img
              src={images[currentImage]}
              alt={`Image ${currentImage + 1}`}
              className="max-w-full max-h-screen mx-auto cursor-pointer"
              onClick={switchToNextImage}
            />

            <button
              onClick={nextImage}
              className="absolute bottom-4 right-4 text-white text-2xl"
            >
              Next
            </button>
          </Modal>
        </div>

        {/* <button
          onClick={openModal}
          className="bg-blue-500 rounded-sm p-2 mt-2 text-xl  hover:bg-blue-900 "
        >
          Watch Tutorial
        </button> */}

        <div className="flex justify-start ">
          <div className="w-[700px] h-[200px] border p-2 m-2 flex items-start justify-center rounded-md flex-col">
            <p className="text-xl">
              Please select all the PDF files in the folder
            </p>

            <input
              ref={fileInputRef}
              className="text-xl mb-5"
              type="file"
              multiple
              onChange={handleFileChange0}
            />

            <p>NOTE: these are the labels sent from our end</p>
          </div>
          <div className="w-[400px] h-[200px] border p-2 m-2 flex items-start justify-center rounded-md flex-col">
            <p>Please select CSV file</p>

            <input
              accept=".csv"
              onChange={handleFileChange}
              className="text-xl mb-5"
              type="file"
            />

            <p>NOTE: these are the labels printed from Ohio pritner</p>
          </div>
        </div>
        <div className="border h-full m-2 rounded-md p-2">
          <div className="flex justify-start items-start flex-col">
            <p className="text-xl">
              Total No of Orders Processed today = {orderNoFromPC.length}
            </p>
            <p className="text-xl">
              Total No of Orders Printed from Ohio = {selectedColumn.length}
            </p>
            <p className="text-xl bg-yellow-600 p-1 rounded-sm">
              Total Difference = {orderNoFromPC.length - selectedColumn.length}
            </p>
          </div>
          <button
            onClick={calulateDifference}
            className="bg-blue-700 p-2 w-40 items-center justify-center rounded-sm mt-2 hover:bg-blue-900  flex "
          >
            Calculate
          </button>
          <button
            onClick={generatePDF}
            className="bg-blue-700 p-2 w-40 items-center justify-center rounded-sm mt-2 hover:bg-blue-900 mb-2 flex "
          >
            Generate PDF
          </button>
          <hr />
          <div className="flex  justify-between gap-10 p-2">
            <div>
              <ul>
                <h3 className="bg-yellow-500 rounded-sm p-2 text-xl">
                  Today Processed Orders
                </h3>
                {orderNoFromPC
                  .slice() // Create a copy to avoid mutating the original array
                  .sort() // Sort the array
                  .map((fileName, index) => (
                    <li key={index}>{fileName}</li>
                  ))}
              </ul>
            </div>
            <div>
              {selectedColumn.length > 0 && (
                <div>
                  <h3 className="bg-yellow-500 rounded-sm p-2 text-xl">
                    Ohio Printed Orders
                  </h3>
                  <ul>
                    {selectedColumn
                      .slice() // Create a copy to avoid mutating the original array
                      .sort() // Sort the array
                      .map((value, index) => (
                        <li key={index}>{value}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="">
              <h3 className="bg-red-500 rounded-sm p-2 text-xl">
                Not Printed Orders
              </h3>
              <ul>
                {diff.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="bg-red-500 rounded-sm p-2 text-xl">
                Double Printed Orders
              </h3>
              <ul>
                {commonValues.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
