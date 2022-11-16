const orderModel = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
    const Order = new orderModel(req.body);
    try {
        const saveOrder = await Order.save();
        res.status(200).json(saveOrder)
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
});

const updateOrder = asyncHandler(async (req, res) => {
    try {
        const updatedOrder = await orderModel(req.params.id, req.body, { new: true });
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});

const deleteOrder = asyncHandler(async (req, res) => {
    try {
        await orderModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted successfully")
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});


const getUserOrder = asyncHandler(async (req, res) => {
    try {
        const Order = await orderModel.findOne({ id: req.user.id });
        res.status(200).json(Order)
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});

const getUserOrders = asyncHandler(async (req, res) => {
    try {
        const Orders = await orderModel.find();
        res.status(200).json(Orders);
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});


const getIncome = asyncHandler(async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
})

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getUserOrders,
    getIncome
}