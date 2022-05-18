

const Auth = require("../controllers/auth.controller.js");

var router = require("express").Router();

router.post('/login', Auth.authSchema, Auth.login);




module.exports = router