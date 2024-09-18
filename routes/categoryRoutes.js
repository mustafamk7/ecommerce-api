const express = require("express");
const router = express.Router();
const authorizeAdmin = require("../middleware/authorizationMiddleware");
const categoryController = require("../controllers/categoryController");

router.post("/", authorizeAdmin, categoryController.createCategory);

router.get("/:id", authorizeAdmin, categoryController.getCategory);

router.put("/:id", authorizeAdmin, categoryController.updateCategory);
router.get("/", authorizeAdmin, categoryController.getAllCategory);

router.delete("/:id", authorizeAdmin, categoryController.deleteCategory);

module.exports = router;
