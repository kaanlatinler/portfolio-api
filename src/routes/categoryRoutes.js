const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  hardDeleteCategory,
} = require("../controllers/categoryController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/get-all-categories", getCategories);
router.get("/get-category-by-id/:id", authenticateToken, getCategoryById);
router.post("/create-category", authenticateToken, createCategory);
router.put("/update-category/:id", authenticateToken, updateCategory);
router.delete("/delete-category/:id", authenticateToken, deleteCategory);
router.delete(
  "/hard-delete-category/:id",
  authenticateToken,
  hardDeleteCategory
); // Optional route for hard delete

module.exports = router;
