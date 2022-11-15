const express = require("express");
const cors = require("cors");
const colors = require("colors")
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(cookieParser())
app.use("/api/auth", authRoute);
app.use(errorMiddleware)
app.listen(PORT,() => {
    console.log(`Server is listening on Port ${PORT}`)
});
