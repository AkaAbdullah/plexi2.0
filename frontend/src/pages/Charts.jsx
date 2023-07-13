import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { getAllOrders } from "../redux/orders/ordersSlice";
import { useEffect, useState } from "react";

export const Charts = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  //Data State
  const [data, setData] = useState([]);
  //Date state
  const [date, setDate] = useState("");

  //data to perfrom claculations
  const [res, setRes] = useState([]);

  //data to map on chart
  // const [finalData, setFinalData] = useState([]);

  const handleSearch = () => {
    const result = data.filter((item) => item.createdAt === date);
    const filteredOrders = result.filter((order) => order.shippingCost !== "");

    const convertedOrders = filteredOrders.map((order) => ({
      ...order,
      shippingCost: parseFloat(order.shippingCost),
    }));
    return setRes(convertedOrders);

    // const finalFilteredOrders = filteredOrders.filter(
    //   (order) => order.orderDetails.length > 2
    // );
    // setFinalData(finalFilteredOrders);
  };

  const [filteredData, setFilteredData] = useState({
    totalOrders: "",
    averageShippingCost: "",
  });

  useEffect(() => {
    const totalOrders = res.length;
    const totalShippingCost = res.reduce(
      (sum, order) => sum + parseFloat(order.shippingCost),
      0
    );
    const averageShippingCost = (totalShippingCost / totalOrders || 0).toFixed(
      3
    );

    setFilteredData((prevData) => ({
      ...prevData,
      totalOrders: res.length,
      averageShippingCost,
    }));
  }, [res]);

  useEffect(() => {
    dispatch(getAllOrders())
      .then((response) => {
        setData(response.payload); // Set the fetched orders to the data state
        console.log(data);
      })
      .catch((error) => {
        console.log("Error fetching orders:", error);
      });
  }, [dispatch]);

  //   const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

  return (
    <>
      <section
        className={`mx-auto py-6 z-10   container    lg:h-fit max-w-6xl ${
          darkMode ? "text-white" : "text-black"
        } `}
      >
        <p className="text-2xl text-center font-bold ">Data Representation </p>
        <div className=" h-24 flex justify-start shadow-xl border rounded-2xl items-center">
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
              setDate(formattedDate);
            }}
          />
          <button
            onClick={handleSearch}
            className="h-10 w-40 bg-blue-700 hover:bg-blue-500 ml-10"
          >
            Search
          </button>
        </div>
        <div className="mt-10 shadow-xl  flex items-center justify-center rounded-2xl">
          <LineChart width={1000} height={500} data={res}>
            <XAxis />
            <YAxis dataKey="shippingCost" domain={[0, "auto"]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orderNo" stroke="#82ca9d" />
            <Line
              type="monotone"
              dataKey="shippingCost"
              activeDot={{ r: 8 }}
              stroke="#8884d8"
            />
          </LineChart>
        </div>

        <div className=" mt-10 p-4 shadow-xl  rounded-2xl">
          <div className="flex justify-between">
            <p className="text-2xl ">Date : {date}</p>

            <p className="text-2xl  ">
              Total Orders : {filteredData.totalOrders}
            </p>
          </div>
          <hr></hr>
          <p className="text-2xl  text-center font-bold">
            Average Shipping Cost : {filteredData.averageShippingCost}
          </p>
        </div>
      </section>
    </>
  );
};
