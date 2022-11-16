const express = require("express");
const cors = require("cors");
const colors = require("colors")
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const cartRoute = require("./routes/cartRoutes");
const stripe = require("./routes/stripe");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(cookieParser())
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/payment/stripe", stripe)
app.use(errorMiddleware);
app.listen(PORT,() => {
    console.log(`Server is listening on Port ${PORT}`)
});
