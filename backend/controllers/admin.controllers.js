const adminModel = require("../models/admin.models");
const blackListModel = require("../models/blackList.models");
const adminServices = require("../services/admin.services");
const { validationResult } = require("express-validator");

module.exports.createAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;
    const newAdmin = await adminServices.createAdmin({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: "Admin account created sucessfully",
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        created_at: newAdmin.created_at,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports.loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;

  let admin;
  if (email) {
    admin = await adminModel.findOne({ email }).select("+password");
  } else if (username) {
    admin = await adminModel.findOne({ username }).select("+password");
  }else{
    return res
      .status(400)
      .json({ message: "Please provide either email or username" });
  }
  if (!admin) {
    return res
      .status(401)
      .json({ message: "Invalid username or email or password!" });
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "Invalid username or email or password!" });
  }

  const token = admin.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({ token, admin });
};

module.exports.getAdminProfile = async(req, res)=>{
    res.status(200).json({admin: req.admin})
}

module.exports.logoutAdmin = async (req, res, next) => {
  res.clearCookie("token");
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  await blackListModel.create({ token });
  return res.status(201).json({ message: "User logged out successfully" });
};