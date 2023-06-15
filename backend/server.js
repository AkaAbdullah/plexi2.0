const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const { errorHandler } = require("./middlewares/errorMiddleware");
const app = express();
const connectDB = require("./config/dbConn");

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
