// module.exports = () => {
const option = require("../controllers/option.controller.js");

var router = require("express").Router();

// Create a new Tutorial
router.post("/", option.create);

// Retrieve all option
router.get("/main", option.getProductMainAttributes);
router.get("/sub", option.getProductSubAttributes);


// Retrieve all published option
router.get("/published", option.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", option.findOne);

// Update a Tutorial with id
router.put("/:id", option.update);

// Delete a Tutorial with id
router.delete("/:id", option.delete);

// Delete all option
router.delete("/", option.deleteAll);

// app.use('/api/option', router);
// };

module.exports = router