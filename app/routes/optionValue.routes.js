// module.exports = () => {
const optionValue = require("../controllers/optionValue.controller.js");

var router = require("express").Router();

// Create a new Tutorial
router.post("/", optionValue.create);

// Retrieve all optionValue
router.get("/", optionValue.findAll);

// Retrieve all published optionValue
router.get("/published", optionValue.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", optionValue.findOne);

// Update a Tutorial with id
router.put("/:id", optionValue.update);

// Delete a Tutorial with id
router.delete("/:id", optionValue.delete);

// Delete all optionValue
router.delete("/", optionValue.deleteAll);

// app.use('/api/optionValue', router);
// };

module.exports = router