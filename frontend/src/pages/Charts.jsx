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

  const [res, setRes] = useState({});

  const handleSearch = () => {
    const result = data.filter((item) => item.createdAt === date);
    return setRes(result);
  };

  const price = [
    {
      price: "10",
    },
    {
      price: "20",
    },
    {
      price: "30",
    },
    {
      price: "50",
    },
    {
      price: "100",
    },
  ];

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
        className={`mx-auto py-6 z-10   container sm:h-fit  lg:h-screen max-w-6xl ${
          darkMode ? "text-white" : "text-black"
        } `}
      >
        <p className="text-2xl text-center font-bold ">Data Representation </p>
        <div className=" h-24 flex justify-start shadow-2xl border rounded-2xl items-center">
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
        <div className="mt-5">
          <LineChart width={1000} height={500} data={res}>
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="shippingCost"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </section>
    </>
  );
};
