const mongoose = require('mongoose');

const Transaction = mongoose.model(
    "Transaction",
    new mongoose.Schema({
        Date: {
            type: Date,
            default: Date.now,
        },
        amount: {
            type: Number,
            required: true,
        }
    })
)
module.exports = Transaction;