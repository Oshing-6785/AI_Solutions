const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const galleryController = require("../controllers/gallery.controller");
const { singleUpload } = require("../multer/multer.config"); 
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/create",
  singleUpload({ subdir: "gallery" }), 
  [
    body("title").isString().isLength({ min: 3, max: 120 }).withMessage("Title must be between 3 and 120 characters"),
    body("category").isString().notEmpty().withMessage("Category is required"),
    body("content").isString().isLength({ min: 10, max: 2000 }).withMessage("Content must be between 10 and 2000 characters"),
    body("date").isISO8601().withMessage("Valid date is required"),
    body("published").optional().isBoolean(),
    body("featured").optional().isBoolean(),
  ],
  authMiddleware.authAdmin,
  galleryController.createGallery
);

router.get("/", galleryController.getAllGalleries);
router.get("/recent", galleryController.getRecentGalleries);
router.get("/:id", galleryController.getGalleryById);

router.put(
  "/:id",
  singleUpload({ subdir: "gallery" }), 
  [
    body("title").optional().isString().isLength({ min: 3, max: 120 }),
    body("category").optional().isString(),
    body("content").optional().isString().isLength({ min: 10, max: 2000 }),
    body("date").optional().isISO8601(),
    body("published").optional().isBoolean(),
    body("featured").optional().isBoolean(),
  ],
  authMiddleware.authAdmin,
  galleryController.updateGallery
);

router.delete("/:id", authMiddleware.authAdmin, galleryController.deleteGallery);

module.exports = router;
