const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getCredentials } = require("../controllers/authController");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/credentials").get(protect, getCredentials)
module.exports = router;