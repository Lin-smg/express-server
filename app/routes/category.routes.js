// module.exports = app => {
const categorys = require("../controllers/category.controller.js");

var router = require("express").Router();

// Create
router.post("/", categorys.create);

// Retrieve
router.get("/", categorys.findAll);

router.get("/parentGroup", categorys.getParentChildCategory);

// Retrieve 
router.get("/published", categorys.findAllPublished);

// Retrieve 
router.get("/:id", categorys.findOne);

// Update
router.put("/:id", categorys.update);

// Delete 
router.delete("/:id", categorys.delete);

// Delete
router.delete("/", categorys.deleteAll);

//     app.use('/api/categorys', router);
// };
module.exports = router;