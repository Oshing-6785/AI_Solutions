const adminModel = require("../models/admin.models");
const blackListModel = require("../models/blackList.models");
const jwt = require("jsonwebtoken");

module.exports.authAdmin = async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization?.split(" ")[1]);
  console.log("Extracted Token:", token);

  if (!token) {
    console.log("Token not provided.");
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  const isBlacklisted = await blackListModel.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    const user = await adminModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};
