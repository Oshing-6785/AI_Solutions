const express = require("express");
const { body } = require("express-validator");
const solutionController = require("../controllers/solution.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware.authAdmin,
  [
    body("icon")
      .isString()
      .notEmpty()
      .isIn([
        "Brain",
        "Zap",
        "MessageSquare",
        "Lightbulb",
        "Cog",
        "Shield",
        "Globe",
        "Users",
      ])
      .withMessage("Invalid icon name"),
    body("title")
      .isString()
      .notEmpty()
      .isLength({ min: 3, max: 100 })
      .withMessage("Title must be 3-100 characters"),
    body("description")
      .isString()
      .notEmpty()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Description must be 10-2000 characters"),
    body("features")
      .isArray()
      .optional()
      .withMessage("Features must be an array of strings"),
    body("badge")
      .optional()
      .isString()
      .isIn(["", "Popular", "Featured", "New", "Enterprise"])
      .withMessage("Invalid badge"),
    body("color")
      .isString()
      .notEmpty()
      .isIn(["primary", "secondary", "accent"])
      .withMessage("Invalid color"),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be a boolean"),
  ],
  solutionController.createSolution
);

router.get("/", solutionController.getAllSolutions);
router.get("/active", solutionController.getActiveSolutions);


router.get("/:id", solutionController.getSolutionById);

router.put(
  "/:id",
  authMiddleware.authAdmin,
  [
    body("icon")
      .optional()
      .isString()
      .isIn([
        "Brain",
        "Zap",
        "MessageSquare",
        "Lightbulb",
        "Cog",
        "Shield",
        "Globe",
        "Users",
      ]),
    body("title").optional().isString().isLength({ min: 3, max: 100 }),
    body("description").optional().isString().isLength({ min: 10, max: 2000 }),
    body("features").optional().isArray(),
    body("badge")
      .optional()
      .isString()
      .isIn(["", "Popular", "Featured", "New", "Enterprise"]),
    body("color")
      .optional()
      .isString()
      .isIn(["primary", "secondary", "accent"]),
    body("isActive").optional().isBoolean(),
  ],
  solutionController.updateSolution
);

router.delete(
  "/:id",
  authMiddleware.authAdmin,
  solutionController.deleteSolution
);

router.patch(
  "/:id/visibility",
  authMiddleware.authAdmin,
  solutionController.toggleVisibility
);


module.exports = router;
