import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import Papa from "papaparse";

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

  const calulateDifference = () => {
    setDiff(orderNoFromPC.filter((item) => !selectedColumn.includes(item)));
  };

  useEffect(() => {
    console.log("Updated diff:", diff);
  }, [diff]);
  return (
    <>
      <section className="container mx-auto max-w-6xl p-4 h-full z-10 text-center text-white">
        <p className="text-2xl font-bold">Custom Cut Printing Report</p>
        <p>
          This page is orignally for generating Amazon Orders NOTE: need to
          update routes from backend
        </p>
        <p>
          The Data is not stored in Database only performs calculations on
          rutime only
        </p>
        <div className="flex justify-between">
          <div className="w-[400px] h-[200px] border p-2 m-2 flex items-start justify-center rounded-md flex-col">
            <p>Please select all the PDF files in the folder</p>

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
              Total Difference = {selectedColumn.length - orderNoFromPC.length}
            </p>
          </div>
          <button
            onClick={calulateDifference}
            className="bg-blue-700 p-2 w-40 items-center justify-center rounded-sm mt-2 hover:bg-blue-900  flex "
          >
            Calculate
          </button>
          <button className="bg-blue-700 p-2 w-40 items-center justify-center rounded-sm mt-2 hover:bg-blue-900 mb-2 flex ">
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
              <h3 className="bg-red-500 rounded-sm p-2 text-xl">Difference</h3>
              <ul>
                {diff.map((value, index) => (
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
