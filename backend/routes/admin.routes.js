const adminController = require("../controllers/admin.controllers");
const authMiddleware = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/create",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be atleast 3 character"),

    body("email").isEmail().withMessage("Invalid email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 character"),
  ],
  adminController.createAdmin
);

router.post(
  "/login",
  [
    body("password").isLength({ min: 6 }).withMessage("Invalid password!"),
    body("email")
      .if(body("username").not().exists())
      .notEmpty()
      .withMessage("Email is required if username is not provided")
      .isEmail()
      .withMessage("Invalid email format"),
    body("username")
      .if(body("email").not().exists())
      .notEmpty()
      .withMessage("Username is required if email is not provided")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email"),
  ],
  adminController.loginAdmin
);
router.get(
  "/profile",
  authMiddleware.authAdmin,
  adminController.getAdminProfile
);

router.get("/logout", authMiddleware.authAdmin, adminController.logoutAdmin);

module.exports = router;
