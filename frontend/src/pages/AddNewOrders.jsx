import { useState } from "react";

export const AddNewOrders = () => {
  const [shape, setShape] = useState("");
  const [newLines, setNewLines] = useState([]);
  const [orderNo, setOrderNo] = useState("");
  const [showTrackingBox, setShowTrackingBox] = useState(false);

  const handleTracking = () => {
    setShowTrackingBox(true);
  };
  const handleShapeChange = (event) => {
    setShape(event.target.value);
  };

  const handleAddLine = () => {
    setNewLines((prevLines) => [...prevLines, {}]);
  };

  return (
    <>
      <section className="container mx-auto py-6 text-white z-10 gap-5 p-4 max-w-6xl h-full flex ">
        <div className="w-1/2 p-6 border h-fit rounded-md">
          <form className="flex flex-col gap-3">
            <label className="text-2xl">
              Order Number <span className="text-sm">(Required)</span>
            </label>
            <input
              className="h-10 bg-transparent focus:bg-white focus:text-black border rounded-md border-teal-100 text-2xl"
              autoFocus
              placeholder="5000456376"
              required
              type="text"
              onChange={(e) => setOrderNo(e.target.value)}
            />
            <label className="text-2xl">Market Place Order id</label>
            <input
              className="h-10 bg-transparent focus:bg-white focus:text-black border rounded-md border-teal-100 text-2xl"
              autoFocus
              placeholder="10083-348848-2333"
              type="text"
            />
            <label className="text-2xl">Thickness</label>
            <input
              className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
              autoFocus
              type="text"
            />
            <label className="text-2xl">Select Shape</label>
            <select
              className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl"
              defaultValue=""
              onChange={handleShapeChange}
            >
              <option value="" disabled>
                Select Shape
              </option>
              <option className="text-black" value="rectangle">
                Rectangle
              </option>
              <option className="text-black" value="circle">
                Circle
              </option>
            </select>

            {shape === "rectangle" && (
              <>
                <label className="text-2xl">Length & Fraction Value</label>
                <input
                  className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
                  autoFocus
                  type="text"
                />
                <label className="text-2xl">Width & Fraction Value</label>
                <input
                  className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
                  autoFocus
                  type="text"
                />
              </>
            )}

            {shape === "circle" && (
              <>
                <label className="text-2xl">Diameter & Fraction Value</label>
                <input
                  className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
                  autoFocus
                  type="text"
                />
              </>
            )}

            {shape !== "" && shape !== "rectangle" && shape !== "circle" && (
              <>
                <label className="text-2xl">Length & Fraction Value</label>
                <input
                  className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
                  autoFocus
                  type="text"
                />
                <label className="text-2xl">Width & Fraction Value</label>
                <input
                  className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
                  autoFocus
                  type="text"
                />
              </>
            )}

            <label className="text-2xl">Quantity</label>
            <input
              className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
              autoFocus
              type="text"
            />
            {/* Display new line forms */}
            {newLines.map((line, index) => (
              <NewLineForm key={index} />
            ))}
            <div className="flex mt-3 items-center justify-evenly gap-10 ">
              <button className="text-2xl bg-orange-600 w-1/2 h-16 rounded-full hover:bg-blue-600">
                Save Order
              </button>

              <button
                onClick={handleAddLine}
                className="text-2xl bg-orange-600 w-1/2 h-16 rounded-full hover:bg-blue-600"
              >
                Add new Line
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2 p-6 border h-fit rounded-md  ">
          <p className="text-3xl text-center">{orderNo}</p>
          <button
            onClick={handleTracking}
            className=" text-xl h-11 w-full rounded-lg mb-5 mt-5 hover:bg-blue-600 bg-orange-600 "
          >
            Add Tracking Number and Shipping Cost
          </button>
          {showTrackingBox && (
            <form className="flex flex-col gap-3">
              <label className="text-2xl">Tracking Number</label>
              <input
                className="h-10 bg-transparent focus:bg-white focus:text-black border rounded-md border-teal-100 text-2xl"
                autoFocus
                placeholder="7563542788949"
                type="text"
              />
              <label className="text-2xl">Shipping Cost</label>
              <input
                className="h-10 bg-transparent focus:bg-white focus:text-black border rounded-md border-teal-100 text-2xl"
                autoFocus
                placeholder="13.90"
                type="text"
              />
              <button className=" text-xl h-11 w-full rounded-lg mb-5 mt-5 hover:bg-blue-600 bg-orange-600 ">
                Add Child Tracking Number
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

const NewLineForm = () => {
  const [shape1, setShape1] = useState("");

  const handleShapeChange1 = (event) => {
    setShape1(event.target.value);
  };

  return (
    <>
      <p className="text-2xl text-center">Add New line Details</p>
      <form className="flex flex-col gap-3">
        <label className="text-2xl">Thickness</label>
        <input
          className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
          autoFocus
          type="text"
        />
        <label className="text-2xl">Select Shape</label>
        <select
          className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl"
          defaultValue=""
          onChange={handleShapeChange1}
        >
          <option value="" disabled>
            Select Shape
          </option>
          <option className="text-black" value="rectangle">
            Rectangle
          </option>
          <option className="text-black" value="circle">
            Circle
          </option>
        </select>
        {shape1 === "rectangle" && (
          <>
            <label className="text-2xl">Length & Fraction Value</label>
            <input
              className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
              autoFocus
              type="text"
            />
            <label className="text-2xl">Width & Fraction Value</label>
            <input
              className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
              autoFocus
              type="text"
            />
          </>
        )}

        {shape1 === "circle" && (
          <>
            <label className="text-2xl">Diameter & Fraction Value</label>
            <input
              className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
              autoFocus
              type="text"
            />
          </>
        )}

        {shape1 !== "" && shape1 !== "rectangle" && shape1 !== "circle" && (
          <>
            <label className="text-2xl">Length & Fraction Value</label>
            <input
              className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
              autoFocus
              type="text"
            />
            <label className="text-2xl">Width & Fraction Value</label>
            <input
              className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
              autoFocus
              type="text"
            />
          </>
        )}

        <label className="text-2xl">Quantity</label>
        <input
          className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
          autoFocus
          type="text"
        />
      </form>
    </>
  );
};
