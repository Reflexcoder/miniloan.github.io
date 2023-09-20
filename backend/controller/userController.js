const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userSchema");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");

//Registe User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

//Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password 🫣", 401));
  }

  //must use await i waste 2 hour for this shit await
  const isPasswordMatced = await user.comparePassword(password);

  if (!isPasswordMatced) {
    return next(new ErrorHandler("Invalid Password 🫣", 401));
  }

  sendToken(user, 200, res);
});

//Logout User

exports.logOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    sucess: true,
    message: "Logged Out Successfully",
  });
});
