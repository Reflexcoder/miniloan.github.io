const mongoose = require("mongoose");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Loan = require("../models/loanSchema");
const Repayment = require("../models/repaymentSchema");
const ErrorHandler = require("../utils/errorhandler");
const Schema = mongoose.Schema;

//create loan
exports.createLoan = catchAsyncErrors(async (req, res, next) => {
  const { name, email, loan_amount, loan_type, loan_term } = req.body;
  const weekly_payment = loan_amount / (loan_term * 1000);
  const user = req.user;
  const loans = await Loan.create({
    user: user._id,
    loan_type,
    loan_amount,
    loan_term,
    weekly_payment,
    loan_balance: loan_amount,
    status: "PENDING",
  });

  res.status(201).json({
    loans,
  });
});

//get all loans

exports.getAllLoans = catchAsyncErrors(async (req, res, next) => {
  const loans = await Loan.find({}).sort({ date_applied: -1 });
  res.status(200).json({
    loans,
  });
});

//get loan detail
exports.getLoanDetails = catchAsyncErrors(async (req, res, next) => {
  const loan = await Loan.findById(req.params.id);

  if (!loan) {
    return next(new ErrorHandler("Loan is not found with this id", 404));
  }

  res.status(200).json({
    loan,
  });
});

exports.approveLoan = catchAsyncErrors(async (req, res, next) => {
  const loanId = req.params.id;

  // Update the loan status to "APPROVED"
  const loan = await Loan.findByIdAndUpdate(
    loanId,
    { status: "APPROVED" },
    { new: true }
  );

  if (!loan) {
    return next(new ErrorHandler("Loan not found", 404));
  }

  res.status(200).json({
    loan,
  });
});

// Update the loan status when all repayments are paid
exports.updateLoan = catchAsyncErrors(async (req, res, next) => {
  const _id = req.params.id;
  const amount_paid = Number(req.body.amount_paid);

  const loan = await Loan.findByIdAndUpdate(
    { _id },
    { $inc: { loan_balance: -amount_paid } },
    { new: true }
  );

  if (!loan) {
    return next(new ErrorHandler("Loan not found", 404));
  }

  // Create a payment history (repayment) entry
  const historyData = {
    loan: loan._id,
    amount_paid,
    remaining_balance: loan.loan_balance,
  };

  const payment = await Repayment.create(historyData);

  // Check if all repayments are paid
  const allRepaymentsPaid = await Repayment.find({
    loan: loan._id,
    status: "PAID",
  }).countDocuments() === loan.loan_term;

  // If all repayments are paid, update the loan status to PAID
  if (allRepaymentsPaid) {
    loan.status = "PAID";
    await loan.save();
  }

  res.status(200).json({
    payment,
    loan,
  });
});


// get payment history

exports.getPaymentHistory = catchAsyncErrors(async (req, res, next) => {
  const payments = await Repayment.find({ loan: req.params.id })
    .populate("loan")
    .sort({ date_paid: 1 });
  res.status(200).json({
    payments,
  });
});
