// module.exports = () => {
const variant = require("../controllers/variant.controller.js");

var router = require("express").Router();

// Create a new Tutorial
router.post("/", variant.create);

// Retrieve all variant
router.get("/", variant.findAll);

// Retrieve all published variant
router.get("/published", variant.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", variant.findOne);

// Update a Tutorial with id
router.put("/:id", variant.update);

// Delete a Tutorial with id
router.delete("/:id", variant.delete);

// Delete all variant
router.delete("/", variant.deleteAll);

// app.use('/api/variant', router);
// };

module.exports = router