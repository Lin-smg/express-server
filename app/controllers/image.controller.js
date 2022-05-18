
const fs = require("fs");
const path = require("path");

exports.getProductImage = (req, res) => {
    console.log(req.query)
    res.sendFile(path.join(__dirname, "../../assets/images/products/" + req.query.image));

};

exports.getUserImage = (req, res) => {
    console.log(req.query)
    res.sendFile(path.join(__dirname, "../../assets/images/users/" + req.query.image));

}