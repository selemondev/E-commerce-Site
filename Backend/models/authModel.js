const mongoose = require("mongoose");
const authSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add an email address"],
    },

    username: {
        type: String,
        required: [true, "Please add a username"]
    },

    password: {
        type: String,
        required: [true, "Please add a password"],
        unique: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    image: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("authSchema", authSchema)