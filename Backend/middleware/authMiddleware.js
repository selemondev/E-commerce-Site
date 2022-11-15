const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const authModel = require("../models/authModel");
const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.status(401);
            throw new Error("Not authenticated")
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = authModel.findById(decoded.id).select('-password');

        next();

    } catch (err) {
        res.status(401);
        throw new Error(err.message);
    };

    if (!token) {
        res.status(401);
        throw new Error("No token, not authorized")
    }

});

module.exports = {
    protect
}