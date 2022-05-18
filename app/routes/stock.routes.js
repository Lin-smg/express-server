// module.exports = () => {
const stock = require("../controllers/stock.controller.js");

var router = require("express").Router();

// Create a new Tutorial
router.post("/", stock.create);

// Retrieve all stock
router.get("/", stock.getAllStock);
router.get("/bySubCat/:id", stock.getStockBySubCatId)

// Retrieve all published stock
router.get("/published", stock.findAllPublished);

// Retrieve a single Tutorial with id
// router.get("/:id", stock.findOne);

// Update a Tutorial with id
router.put("/:id", stock.update);

// Delete a Tutorial with id
router.delete("/:id", stock.delete);

// Delete all stock
router.delete("/", stock.deleteAll);

// app.use('/api/stock', router);
// };

module.exports = router