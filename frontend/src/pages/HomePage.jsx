import { useState, useEffect } from "react";
import axios from "axios";

export const HomePage = () => {
  const [formData, setFormData] = useState({
    orderNo: "",
    marketPlaceOrderId: "",
    thickness: "",
    length: "",
    width: "",
    diameter: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...[formData],
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    postApiCall();
  };

  //API call to get ORDERS
  const [resOrders, setResOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getdata = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setResOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [name, setName] = useState("");
  useEffect(() => {
    setName(resOrders.orderCreatedBy);
  }, [resOrders]);

  useEffect(() => {
    getdata();
  }, []);
  //API calls for post method

  const postApiCall = async () => {
    const res = await axios.post("http://localhost:5000/api/orders", {
      formData,
    });
  };

  return (
    <>
      <div>
        <h2>Testing orders</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            gap: "20px",
          }}
        >
          <input
            onChange={handleChange}
            name="orderNo"
            type="number"
            placeholder="Orderno"
          ></input>
          <input
            onChange={handleChange}
            name="marketPlaceOrderId"
            type="text"
            placeholder=" market place order id"
          ></input>
          <input
            onChange={handleChange}
            name="thickness"
            type="text"
            placeholder="thickness"
          ></input>
          <input
            onChange={handleChange}
            name="length"
            type="text"
            placeholder="length"
          ></input>
          <input
            onChange={handleChange}
            name="width"
            type="text"
            placeholder="width"
          ></input>
          <input
            onChange={handleChange}
            name="diameter"
            type="text"
            placeholder="diameter"
          ></input>
          <input
            onChange={handleChange}
            name="quantity"
            type="text"
            placeholder="quantity"
          ></input>
          <button type="submit">Save ORders</button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : (
          resOrders.map((order) => (
            <li key={order._id}>
              Order No: {order.orderNo}, created by : {order.orderCreatedBy}
            </li>
          ))
        )}
        <p>name : {name}</p>
      </div>
    </>
  );
};
