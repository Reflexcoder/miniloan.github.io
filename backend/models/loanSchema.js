const mongoose = require("mongoose");

var enu = {
  values: ["Education", "Business"],
  message: "Status is required.",
};

const loanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model for associating loans with users
    required: true,
  },

  loan_balance: {
    type: Number,
    required: true,
  },
  loan_type: {
    status: {
      type: String,
      enum: enu,
      trim: true,
    },
  },
  loan_amount: {
    type: Number,
    required: true,
  },
  loan_term: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "PAID"],
    default: "PENDING",
  },
  date_applied: {
    type: Date,
    required: true,
    default: Date.now,
  },
  weekly_payment: {
    type: Number,
  },
});

module.exports = mongoose.model("Loan", loanSchema);
