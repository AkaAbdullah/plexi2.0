import { useState, useEffect } from "react";
import axios from "axios";

export const HomePage = () => {
  useEffect(() => {
    getdata();
  }, []);

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
  };

  //API call to get ORDERS
  const [resOrders, setResOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const getdata = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(config);
      const response = await axios.get(
        "http://localhost:5000/api/orders",
        config
      );
      setResOrders(response.data);
      setLoading(false);
      console.log(response.data);
      console.log(resOrders);
    } catch (error) {
      setErr(error);
      setLoading(false);
    }
  };

  //Login Function here all

  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          userName,
          password,
        }
      );
      console.log(responce.data);
      localStorage.setItem("token", responce?.data?.token);
    } catch (error) {
      console.log(error);
    }
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
        <h2>Orders Get Request</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          resOrders.map((order) => (
            <li key={order}>
              {order.details?.map((data, index) => {
                return (
                  <>
                    {" "}
                    <div key={index}>
                      Order No: {order.orderNo}, created by :
                      {order.orderCreatedBy.userName} <p>{data.length}</p>{" "}
                      <p>{order.orderNo}</p>
                    </div>
                  </>
                );
              })}
            </li>
          ))
        )}
        <div>{err.message}</div>
      </div>
      <div>
        <h2>Login user</h2>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            gap: "20px",
          }}
        >
          <input
            onChange={(e) => setName(e.target.value)}
            name="username"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
};
