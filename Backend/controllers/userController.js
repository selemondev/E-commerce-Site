const authModel = require("../models/authModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const updateUser = asyncHandler(async (req, res) => {
    if (req.user.id === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashPassword;
        };

        try {
            const updatedUser = await authModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(400);
            throw new Error(err.message)
        }
    } else {
        res.status(403);
        throw new Error("Not authorized, you can only delete your account")
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    if (req.user.id === req.params.id) {
        const deleteUser = await authModel.findById(req.params.id);

        try {
            await authModel.findByIdAndDelete(deleteUser);
            res.status(200).json(`${{ id: req.params.id }} deleted successfully`)
        } catch (err) {
            res.status(404);
            throw new Error(err.message)
        }
    } else {
        res.status(403);
        throw new Error("Not authorized, you can only delete your account")
    }
});

const findUser = asyncHandler(async (req, res) => {
    try {
        const user = await authModel.findById(req.params.id).select("-password");
        res.status(200).json(user)
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const query = req.query.new;

    try {
        const users = query ? await authModel.find().sort({ createdAt: -1 }).limit(1) : await authModel.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});

const getUserStats = asyncHandler(async (req, res) => {
    const date = new Date();
    const previousYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await authModel.aggregate([
            { $match: { createdAt: { $gte: previousYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});

module.exports = {
    updateUser,
    deleteUser,
    findUser,
    getUsers,
    getUserStats
}