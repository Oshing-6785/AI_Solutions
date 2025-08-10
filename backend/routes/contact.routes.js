const contactController = require("../controllers/contact.controllers");
const authMiddleware = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/create",
  [
    body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 20 characters long"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email address"),
    body("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be exactly 10 digits long"),
    body("company_name")
      .notEmpty()
      .withMessage("Company name is required")
      .isLength({ min: 2, max: 30 })
      .withMessage("Company name must be between 2 and 30 characters long"),
    body("country")
      .notEmpty()
      .withMessage("Country is required")
      .isLength({ min: 2, max: 30 })
      .withMessage("Country name must be between 2 and 30 characters long"),
    body("job_title")
      .notEmpty()
      .withMessage("Job title is required")
      .isLength({ min: 2, max: 30 })
      .withMessage("Job title must be between 2 and 30 characters long"),
    body("message")
      .notEmpty() 
        .withMessage("Message is required") 
        .isLength({ min: 10, max: 50000 })
        .withMessage("Message must be between 10 and 50000 characters long"),     
  ],
    contactController.createContact 
);

router.get("/", contactController.getAllContacts);
router.get("/count", contactController.getContactCount);
router.get("/search", contactController.searchContacts);
router.get("/email/:email", contactController.getContactByEmail);
router.get("/name/:name", contactController.getContactByName); 
router.get("/phone/:phone", contactController.getContactByPhone);
router.get("/company/:company_name", contactController.getContactByCompanyName);
router.get("/job/:job_title", contactController.getContactByJobTitle);
router.get("/country/:country", contactController.getContactByCountry);
router.get("/recent", contactController.getRecentContacts); 
router.get("/stats", contactController.getContactStats);
router.get("/:id", contactController.getContactById);


router.put("/:id", authMiddleware.authAdmin, contactController.updateContact);

router.delete("/:id", authMiddleware.authAdmin, contactController.deleteContact);

module.exports = router;