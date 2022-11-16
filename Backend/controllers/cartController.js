const cartModel = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

const createCart = asyncHandler(async (req, res) => {
    const cart = new cartModel(req.body);
    try {
        const saveCart = await cart.save();
        res.status(200).json(saveCart)
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
});

const updateCart = asyncHandler(async (req, res) => {
    try {
        const updatedCart = await cartModel(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});

const deleteCart = asyncHandler(async (req, res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted successfully")
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});


const getUserCart = asyncHandler(async (req, res) => {
    try {
        const cart = await cartModel.findOne({ id: req.user.id });
        res.status(200).json(cart)
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});

const getUserCarts = asyncHandler(async (req, res) => {
    try {
        const carts = await cartModel.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getUserCarts
}