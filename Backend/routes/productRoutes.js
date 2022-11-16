const express = require('express');
const router = express.Router();
const { verifyIsAdmin } = require("../middleware/authMiddleware")
const { createProduct, updateProduct, deleteProduct, getProduct, getProducts } = require("../controllers/productController");
router.route("/get/products").get(getProducts)
router.route("/create").post(verifyIsAdmin, createProduct);
router.route("/update/:id").put(verifyIsAdmin, updateProduct);
router.route("/delete/:id").delete(verifyIsAdmin, deleteProduct);
router.route("/find/product/:id").get(getProduct);

module.exports = router;