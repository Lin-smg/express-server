// module.exports = app => {
const products = require("../controllers/product.controller.js");
const multer = require("multer")

const upload = multer({
    dest: './uploads'
})

var router = require("express").Router();

// Create
router.post("/", products.create);
router.post("/createProduct", upload.single('file'), products.createProduct);

// Retrieve
router.get("/", products.findAll);
router.get("/getAllProduct", products.getAllProduct);
router.get("/bySubCat/:id", products.getProductBySubCatId)
router.get("/byId/:id", products.getProductById)

router.post("/getProductByOption", products.getAllProductByOption);


router.post("/upload", upload.single('file'), products.uploadImg);
router.get("/image", products.getImage);
router.get("/userImage", products.getUserImage);


// Retrieve 
router.get("/published", products.findAllPublished);


// Update
router.put("/:id", products.update);
router.put("/withImg/:id", upload.single('file'), products.updateProductWithImg);

// Delete 
router.delete("/:id", products.delete);

// Delete
router.delete("/", products.deleteAll);

// app.use('/api/products', router);
// };

module.exports = router;