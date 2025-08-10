const express = require("express");
const { body } = require("express-validator");
const industryController = require("../controllers/industry.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware.authAdmin,
  [
    body("name")
      .isString()
      .notEmpty()
      .isLength({ min: 2, max: 100 })
      .withMessage("Industry name must be 2–100 characters long"),
  ],
  industryController.createIndustry
);

router.get("/", industryController.getAllIndustries);
router.get("/active", industryController.getActiveIndustries);
router.patch(
  "/:id/visibility",
  authMiddleware.authAdmin,
  industryController.toggleIndustryVisibility
);

router.put(
  "/:id",
  authMiddleware.authAdmin,
  [
    body("name")
      .optional()
      .isString()
      .isLength({ min: 2, max: 100 })
      .withMessage("Industry name must be 2–100 characters long"),
    body("isActive").optional().isBoolean(),
  ],
  industryController.updateIndustry
);


router.delete(
  "/:id",
  authMiddleware.authAdmin,
  industryController.deleteIndustry
);

module.exports = router;
