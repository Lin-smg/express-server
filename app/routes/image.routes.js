
const image = require("../controllers/image.controller.js");

var router = require("express").Router();

router.get('/products', image.getProductImage)
router.get('/users', image.getUserImage)


module.exports = router