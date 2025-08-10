const postController = require("../controllers/post.contcollers");
const authMiddleware = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/create",
  [
    body("title")
      .isString()
      .notEmpty()
      .isLength({ min: 3, max: 100 })
      .withMessage("Title must be between 3 and 100 characters"),
    body("category")
      .isString()
      .notEmpty()
      .isLength({ min: 2, max: 50 })
      .withMessage("Category must be between 2 and 50 characters"),
    body("content")
      .isString()
      .notEmpty()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Content must be between 10 and 2000 characters"),
    body("image_url")
      .notEmpty()
      .withMessage("Image URL is required")
      .isURL()
      .withMessage("Image URL must be a valid URL"),

    body("published")
      .isBoolean()
      .withMessage("Published must be a boolean value"),
  ],
  authMiddleware.authAdmin,
  postController.createPost
);
router.get("/", postController.getAllPosts);
router.get("/recent", postController.getRecentPosts);
router.delete("/:id", authMiddleware.authAdmin, postController.deletePost);
router.get("/:id", postController.getPostById);
router.put(
  "/:id",
  [
    body("title")
      .notEmpty()
      .optional()
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage("Title must be between 3 and 100 characters"),
    body("category")
      .notEmpty()
      .isString()
      .optional()
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage("Category must be between 2 and 50 characters"),
    body("content")
      .notEmpty()
      .optional()
      .isString()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Content must be between 10 and 2000 characters"),
    body("image_url")
      .notEmpty()
      .optional()
      .withMessage("Image URL must be a valid URL"),
    body("published")
      .notEmpty()
      .optional()
      .isBoolean()
      .withMessage("Published must be a boolean value"),
  ],
  authMiddleware.authAdmin,
  postController.updatePost
);

module.exports = router;
