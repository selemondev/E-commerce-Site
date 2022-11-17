const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    desc: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    categories: {
        type: Array
    },

    color: {
        type: String
    },

    price: {
        type: String,
        required: true
    },

    inStock: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("productSchema", productSchema);