const express = require("express");
const cors = require("cors");
const colors = require("colors")
const dotenv = require("dotenv").config();
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.listen((req, res) => {
    console.log(`Server is listening on Port ${PORT}`)
});
