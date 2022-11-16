const express = require('express');
const router = express.Router();
const { protect, verifyIsAdmin } = require("../middleware/authMiddleware");
const { createOrder, updateOrder, deleteOrder, getUserOrder, getUserOrders, getIncome } = require("../controllers/OrderController");
router.route("/create/Order").post(protect, createOrder);
router.route("/update/Order/:id").put(verifyIsAdmin, updateOrder);
router.route("/delete/Order/:id").delete(verifyIsAdmin, deleteOrder);
router.route("/find/Order/:id").get(protect, getUserOrder);
router.route("/get/Orders").get(verifyIsAdmin, getUserOrders);
router.route("/get/order/income").get(verifyIsAdmin, getIncome)
module.exports = router;