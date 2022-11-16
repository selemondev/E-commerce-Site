const express = require('express');
const router = express.Router();
const { protect, verifyIsAdmin } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getCredentials } = require("../controllers/authController");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/credentials").get(verifyIsAdmin, getCredentials)
module.exports = router;