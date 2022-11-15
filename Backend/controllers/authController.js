const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;

    if (!email, !password, !username) {
        res.status(400);
        throw new Error("Please fill in all the required fields")
    };

    const userExists = authModel.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists")
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await authModel.create({
        email,
        username,
        password: hashedPassword
    });

    if (user) {
        res.status(201)
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error(" Invalid credentials ")
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter all the required fields")
    };

    const user = await authModel.findOne({ email })

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200);
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid user credentials")
    }
})


function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET_KET, {
        expiresIn: "2d"
    })
};


module.exports = {
    registerUser,
    loginUser
}