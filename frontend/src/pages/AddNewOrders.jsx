import { useEffect, useState } from "react";
import { CreateOrders, reset } from "../redux/orders/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "../components/Spinner";

export const AddNewOrders = () => {
  const [shape, setShape] = useState("");
  const [newLines, setNewLines] = useState([]);
  const [showTrackingBox, setShowTrackingBox] = useState(false);
  const [childTracking, setChildTracking] = useState([]);
  const { darkMode } = useSelector((state) => state.theme);

  const handleTracking = () => {
    setShowTrackingBox(true);
  };
  const handleShapeChange = (event) => {
    setShape(event.target.value);
  };

  const handleAddLine = (e) => {
    e.preventDefault();
    setNewLines((prevLines) => [...prevLines, {}]);
  };

  const handleChilTracking = (e) => {
    e.preventDefault();
    setChildTracking((prevTracking) => [...prevTracking, {}]);
  };

  //REDUX api
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, createdOrder } = useSelector(
    (state) => state.orders
  );
  useEffect(() => {
    if (isError) {
      toast.error("Failed To Create Order");
      dispatch(reset());
    }
    if (isSuccess === true) {
      toast.success("Order Created Sucessfully");
      dispatch(reset());
    }
  }, [isError, isLoading, isSuccess, createdOrder, dispatch]);

  const styles = {
    height: "80",
    width: "80",
  };

  //State for getting form Data
  const [formData, setFormData] = useState(null);

  const handleFromData = (e) => {
   e.preventDefault()
    dispatch(CreateOrders(formData));
    setOrderNo("");
    setOrderId("");
    setTracking("");
    setCost("");
    setOrderDetails([]);
    setShape(""); // Reset the 'shape' state
    setNewLines([]); // Reset the 'newLines' state
    setShowTrackingBox(false); // Reset the 'showTrackingBox' state
    setChildTracking([]); // Reset the 'childTracking' state
  };

  const [orderNo, setOrderNo] = useState("");
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState("");
  const [cost, setCost] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);

  const handleInputChange = (index, name, value) => {
    setOrderDetails((prevOrderDetails) => {
      const updatedOrderDetails = [...prevOrderDetails];
      updatedOrderDetails[index] = {
        ...updatedOrderDetails[index],
        [name]: value,
      };
      return updatedOrderDetails;
    });
  };

  useEffect(() => {
    setFormData({
      orderNo,
      orderId,
      tracking,
      cost,
      orderDetails,
    });
  }, [orderNo, orderId, tracking, cost, orderDetails]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section
        className={`container mx-auto sm:flex sm:flex-col lg:flex-row   py-6 ${
          darkMode ? "text-white" : "text-black"
        } z-10 gap-5 p-4 max-w-6xl  lg:h-fit sm:h-fit  `}
      >
        <div
          className={`lg:w-1/2 p-6  ${
            darkMode
              ? "border  rounded-2xl "
              : " border border-black border-sm rounded-2xl bg-transparent"
          }  h-fit `}
        >
          <form className="flex flex-col gap-3">
            <label className="text-2xl">
              Order Number <span className="text-sm">(Required)</span>
            </label>
            <input
              className={` "h-10 bg-transparent ${
                darkMode
                  ? "focus:bg-white   border-white focus:text-black "
                  : "text-black focus:bg-transparent border-black  "
              }  border rounded-md  text-2xl `}
              autoFocus
              required
              type="text"
              name="orderNo"
              onChange={(e) => setOrderNo(e.target.value)}
            />
            <label className="text-2xl">Market Place Order id</label>
            <input
              className={` "h-10 bg-transparent ${
                darkMode
                  ? "focus:bg-white   border-white focus:text-black "
                  : "text-black focus:bg-transparent border-black  "
              }  border rounded-md  text-2xl `}
              autoFocus
              type="text"
              name="marketPlaceOrderId"
              onChange={(e) => setOrderId(e.target.value)}
            />
            <label className="text-2xl">Thickness</label>
            <input
              className={` "h-10 bg-transparent ${
                darkMode
                  ? "focus:bg-white   border-white focus:text-black "
                  : "text-black focus:bg-transparent border-black  "
              }  border rounded-md  text-2xl `}
              autoFocus
              type="text"
              name="thickness"
              onChange={(e) =>
                handleInputChange(0, e.target.name, e.target.value)
              }
            />
            <label className="text-2xl">Select Shape</label>
            <select
              className={` "h-10 bg-transparent ${
                darkMode
                  ? "focus:bg-transparent   border-white focus:text-white "
                  : "text-black focus:bg-transparent border-black  "
              }  border rounded-md  text-2xl `}
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
                  className={` "h-10 bg-transparent ${
                    darkMode
                      ? "focus:bg-white   border-white focus:text-black "
                      : "text-black focus:bg-transparent border-black  "
                  }  border rounded-md  text-2xl `}
                  autoFocus
                  type="text"
                  name="length"
                  onChange={(e) =>
                    handleInputChange(0, e.target.name, e.target.value)
                  }
                />
                <label className="text-2xl">Width & Fraction Value</label>
                <input
                  className={` "h-10 bg-transparent ${
                    darkMode
                      ? "focus:bg-white   border-white focus:text-black "
                      : "text-black focus:bg-transparent border-black  "
                  }  border rounded-md  text-2xl `}
                  autoFocus
                  type="text"
                  name="width"
                  onChange={(e) =>
                    handleInputChange(0, e.target.name, e.target.value)
                  }
                />
              </>
            )}

            {shape === "circle" && (
              <>
                <label className="text-2xl">Diameter & Fraction Value</label>
                <input
                  className={` "h-10 bg-transparent ${
                    darkMode
                      ? "focus:bg-white   border-white focus:text-black "
                      : "text-black focus:bg-transparent border-black  "
                  }  border rounded-md  text-2xl `}
                  autoFocus
                  type="text"
                  name="diameter"
                  onChange={(e) =>
                    handleInputChange(0, e.target.name, e.target.value)
                  }
                />
              </>
            )}

            <label className="text-2xl">Quantity</label>
            <input
              className={` "h-10 bg-transparent ${
                darkMode
                  ? "focus:bg-white   border-white focus:text-black "
                  : "text-black focus:bg-transparent border-black  "
              }  border rounded-md  text-2xl `}
              autoFocus
              type="text"
              name="quantity"
              onChange={(e) =>
                handleInputChange(0, e.target.name, e.target.value)
              }
            />
            {/* Display new line forms */}
            {newLines.map((line, index) => (
              <NewLineForm handleInputChange={handleInputChange} key={index} />
            ))}
            <div className="flex mt-3 items-center justify-evenly gap-10 ">
              <button
                onClick={handleFromData}
                type="submit"
                className={`text-2xl ${
                  darkMode
                    ? "bg-blue-700 hover:bg-blue-500"
                    : "bg-blue-700 hover:bg-blue-500"
                }  w-1/2 h-16 rounded-full `}
              >
                Save Order
              </button>

              <button
                onClick={handleAddLine}
                className={`text-2xl ${
                  darkMode
                    ? "bg-blue-700 hover:bg-blue-500"
                    : "bg-blue-700 hover:bg-blue-500"
                }  w-1/2 h-16 rounded-full `}
              >
                Add new Line
              </button>
            </div>
          </form>
        </div>
        <div
          className={`lg:w-1/2 p-6 flex items-center flex-col border h-fit rounded-2xl ${
            darkMode ? "border-white " : "border-black"
          }  `}
        >
          <p className="text-3xl text-center">{orderNo}</p>
          <button
            onClick={handleTracking}
            className={` text-xl h-11 w-full rounded-lg mb-5 mt-5 ${
              darkMode
                ? "bg-blue-700 hover:bg-blue-500"
                : "bg-blue-700 hover:bg-blue-500"
            } `}
          >
            Add Tracking Number and Shipping Cost
          </button>
          {showTrackingBox && (
            <form className="flex flex-col gap-3">
              <label className="text-2xl">Tracking Number</label>
              <input
                className={`h-10 bg-transparent ${
                  darkMode ? "" : "border border-black"
                } focus:text-black border rounded-md  text-2xl`}
                autoFocus
                type="text"
                name="tracking"
                onChange={(e) => setTracking(e.target.value)}
              />
              <label className="text-2xl">Shipping Cost</label>
              <input
                className={`h-10 bg-transparent ${
                  darkMode ? "" : "border border-black"
                } focus:text-black border rounded-md  text-2xl`}
                autoFocus
                type="text"
                name="cost"
                onChange={(e) => setCost(e.target.value)}
              />
              {childTracking.map((line, index) => (
                <ChildTrackingForm key={index} />
              ))}
              <button
                onClick={handleChilTracking}
                className={`text-xl h-11 w-full rounded-lg mb-5 mt-5 ${
                  darkMode
                    ? "bg-blue-700 hover:bg-blue-500"
                    : "bg-blue-700 hover:bg-blue-500"
                } `}
              >
                Add Child Tracking Number
              </button>
            </form>
          )}
          {isLoading && <Spinner styles={styles} />}
        </div>
      </section>
    </>
  );
};

const NewLineForm = ({ handleInputChange }) => {
  const [shape1, setShape1] = useState("");
  const handleInput = (index, name, value) => {
    handleInputChange(index, name, value);
  };

  const handleShapeChange1 = (event) => {
    setShape1(event.target.value);
  };

  return (
    <>
      <p className="text-2xl text-center"> New line Details</p>
      <form className="flex flex-col gap-3">
        <label className="text-2xl">Thickness</label>
        <input
          className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
          autoFocus
          type="text"
          name="thickness"
          onChange={(e) => handleInput(1, e.target.name, e.target.value)}
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
              name="length"
              onChange={(e) => handleInput(1, e.target.name, e.target.value)}
            />
            <label className="text-2xl">Width & Fraction Value</label>
            <input
              className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
              autoFocus
              type="text"
              name="width"
              onChange={(e) => handleInput(1, e.target.name, e.target.value)}
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
              name="diameter"
              onChange={(e) => handleInput(1, e.target.name, e.target.value)}
            />
          </>
        )}

        <label className="text-2xl">Quantity</label>
        <input
          className="h-10 bg-transparent border rounded-md border-teal-100 text-2xl focus:bg-white focus:text-black"
          autoFocus
          type="text"
          name="quantity"
          onChange={(e) => handleInput(1, e.target.name, e.target.value)}
        />
      </form>
    </>
  );
};

const ChildTrackingForm = () => {
  return (
    <>
      <p className=" text-xl">Feature not Avalible yet</p>
    </>
  );
};
