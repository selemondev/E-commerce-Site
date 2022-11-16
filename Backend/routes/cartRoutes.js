const express = require('express');
const router = express.Router();
const { protect, verifyIsAdmin } = require("../middleware/authMiddleware");
const { createCart, updateCart, deleteCart, getUserCart, getUserCarts } = require("../controllers/cartController");
router.route("/create/cart").post(protect, createCart);
router.route("/update/cart/:id").put(protect, updateCart);
router.route("/delete/cart/:id").delete(protect, deleteCart);
router.route("/find/cart/:id").get(protect, getUserCart);
router.route("/get/carts").get(verifyIsAdmin, getUserCarts);

module.exports = router;