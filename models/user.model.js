const mongoose = require('mongoose');

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transactions"
            }
        ]
    })
);
module.exports = User;