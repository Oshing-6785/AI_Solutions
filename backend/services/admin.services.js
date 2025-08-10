const adminModel = require("../models/admin.models");

module.exports.createAdmin = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  const existingAdmin = await adminModel.findOne({
    $or: [
        { username: { $eq: username } }, 
        { email: { $eq: email } }
    ],
  });
  if (existingAdmin) {
    throw new Error("You are not admin, please contact the admin");
  }
  const hashedPassword = await adminModel.hashPassword(password);
  const newAdmin = new adminModel({
    username,
    email,
    password: hashedPassword,
  });
  await newAdmin.save();
  return newAdmin;
};
