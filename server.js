const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization");
//   res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS");
//   next();
// });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var mainRoutes = require('./app/routes/index')

const db = require("./app/models");
db.sequelize.sync();

const logger = function (req,res,next) {
  console.info('Request LOG >>>> ', req.url + ' :'+req.method + ' :body'+ JSON.stringify(req.body));
  next();
};
app.use(logger)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome, How are you?" });
});

require("./app/routes/tutorial.routes")(app);
// require("./app/routes/product.routes")(app);
// require("./app/routes/category.routes")(app);
// require("./app/routes/mainCategory.routes")(app);
// require("./app/routes/stock.routes")(app);
// app.use(mainRoutes);
require('./app/routes/index')(app)

app.get("/image", (req, res) => {
  console.log(req.query)
  res.sendFile(path.join(__dirname, './uploads/' + req.query.img));
  // res.json({ message: req });
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});