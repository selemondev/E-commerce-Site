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

        req.user = await authModel.findById(decoded.id).select('-password');

        next();

    } catch (err) {
        res.status(401);
        throw new Error(err.message);
    };

});



const verifyIsAdmin = asyncHandler(async (req, res, next) => {
    protect(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(400);
            throw new Error("Not admin, not authorized")
        }
    })
});

module.exports = {
    protect,
    verifyIsAdmin
}