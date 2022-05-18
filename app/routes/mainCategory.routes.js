// module.exports = app => {
const mainCategory = require("../controllers/mainCategory.controller.js");

var router = require("express").Router();

// Create a new Category
router.post("/main", mainCategory.createMainCategory);
router.post("/sub", mainCategory.createSubCategory);


// Retrieve all Tutorials
router.get("/main", mainCategory.getAllMainCategory);
router.get("/sub", mainCategory.getAllSubCategory);
router.get("/mainSub", mainCategory.getAllMainSubCategory);

// Retrieve all published Tutorials
router.get("/published", mainCategory.findAllPublished);

// Retrieve a single Category with id
router.get("/:id", mainCategory.findOne);

// Update a Category with id
router.put("/main/:id", mainCategory.updateMainCategory);
router.put("/sub/:id", mainCategory.updateSubCategory);

// Delete a Category with id
router.delete("/main/:id", mainCategory.deleteMainCategory);
router.delete("/sub/:id", mainCategory.deleteSubCategory);

// Delete all Tutorials
router.delete("/", mainCategory.deleteAll);

module.exports = router;