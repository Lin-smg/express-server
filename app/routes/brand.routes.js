
var router = require("express").Router();

const Brand = require("../controllers/brand.controller")
const multer = require("multer")

const upload = multer({
    dest: './uploads'
})

// Create
router.post("/", upload.single('file'), Brand.create);

// update
router.put("/", upload.single('file'), Brand.update);

// get
router.get("/", Brand.getAllBrand);

// delete
router.delete("/", Brand.delete);
