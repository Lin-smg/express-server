const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.products = require("./product.model")(sequelize, Sequelize);
db.categorys = require("./category.model")(sequelize, Sequelize);
db.mainCategory = require("./mainCategory.model")(sequelize, Sequelize);
db.subCategory = require("./subCategory.model")(sequelize, Sequelize);
db.stock = require("./stock.model")(sequelize, Sequelize);
db.option = require("./option.model")(sequelize, Sequelize);
db.optionValue = require("./optionValue.model")(sequelize, Sequelize);
db.variant = require("./variant.model")(sequelize, Sequelize);
db.User = require("./user.model")(sequelize, Sequelize);
db.Customer = require("./customer.model")(sequelize, Sequelize);


module.exports = db;