var router = require("express").Router();

const customer = require("../controllers/customer.controller");

//create 
router.post("/", customer.createCustomer);

// get
router.get("/", customer.getAllCustomer);


module.exports = router;