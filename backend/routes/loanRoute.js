const express = require("express");
const router = express.Router();
const {
  createLoan,
  getAllLoans,
  getLoanDetails,
  updateLoan,
  getPaymentHistory,
  approveLoan,
} = require("../controller/loanController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/new/loan").post(isAuthenticatedUser, createLoan);

router.route("/loans").get(isAuthenticatedUser, getAllLoans);
router.route("/loan/:id").get(isAuthenticatedUser, getLoanDetails);
router.route("/loan/:id").put(isAuthenticatedUser, updateLoan);
router.route("/history/:id").get(isAuthenticatedUser, getPaymentHistory);

//only admin can change this
router
  .route("/loan/approve/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), approveLoan);

module.exports = router;
