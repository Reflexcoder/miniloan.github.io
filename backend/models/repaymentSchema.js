const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repaymentSchema = new mongoose.Schema({
  loan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loan",
  },
  amount_paid: {
    type: Number,
  },
  remaining_balance: {
    type: Number,
  },
  date_paid: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["PENDING", "PAID"],
    default: "PAID",
  },
});

module.exports = mongoose.model("Repayment", repaymentSchema);
