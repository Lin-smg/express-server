const db = require("../models");
const Stock = db.stock;
const OptionValue = db.optionValue;
const Product = db.products;
const Variant = db.variant;
const Option = db.option;
const MainCategory = db.mainCategory;
const SubCategory = db.subCategory;

const stockService = require("../services/stock.service")

// Create and Save a new Stock
exports.create = (req, res) => {
    const product_id = req.body.product_id;
    let stocks = req.body.stocks
    let stock = {};
    let variant = {};
    let stock_id = null;
    for (let s of stocks) {
        stock = {
            product_id: product_id,
            qty: s.qty,
            price: s.price,
            code: s.code
        }
        Stock.create(stock).then(data => {
            stock_id = data.id;
            for (let v of s.variants) {
                if (v.option_value_id) {

                    variant = {
                        stock_id: stock_id,
                        opt_value_id: v.option_value_id
                    }
                    Variant.create(variant).then(result => {
                        res.status(200).send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Stock."
                        });
                    });
                }

            }
        })
    }

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Stock.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.getAllStock = async (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    let { data, count } = await stockService.getAllStock();

    res.json({
        result: 0,
        count: count,
        data: data
    })

    // Product.belongsTo(MainCategory, { foreignKey: 'category_id' })
    // MainCategory.hasMany(Product, { foreignKey: 'category_id' })
    // SubCategory.hasMany(Product, { foreignKey: "sub_cat_id" });
    // Product.belongsTo(SubCategory, { foreignKey: "sub_cat_id" });
    // Product.hasMany(Stock, { foreignKey: 'product_id' })
    // Stock.belongsTo(Product, { foreignKey: 'product_id' })
    // Stock.hasMany(Variant, { foreignKey: 'stock_id' })
    // Variant.belongsTo(Stock, { foreignKey: 'stock_id' })
    // Variant.belongsTo(OptionValue, { foreignKey: 'opt_value_id' })
    // OptionValue.hasMany(Variant, { foreignKey: 'opt_value_id' })
    // OptionValue.belongsTo(Option, { foreignKey: 'option_id' })
    // Option.hasMany(OptionValue, { foreignKey: 'option_id' })

    // Stock.findAll({
    //     where: {}, include: [
    //         {
    //             model: Product,
    //             include: [
    //                 {
    //                     model: MainCategory
    //                 },
    //                 {
    //                     model: SubCategory
    //                 },
    //             ]
    //         },
    //         {
    //             model: Variant,
    //             include: [
    //                 {
    //                     model: OptionValue,
    //                     include: [
    //                         Option
    //                     ]
    //                 }
    //             ]
    //         },

    //     ]
    // })
    //     .then(data => {

    //         const resObj = data.map(stock => {
    //             return Object.assign(
    //                 {}, {
    //                 id: stock.id,
    //                 // product_name: stock.product.title,
    //                 // main_category: stock.product.main_category.title,
    //                 // sub_category: stock.product.sub_category.title,
    //                 price: stock.price,
    //                 qty: stock.qty,
    //                 code: stock.code,
    //                 product: stock.product,

    //                 variants: stock.variants.map(variant => {
    //                     return Object.assign({}, {
    //                         variant_id: variant.id,
    //                         opt_value_id: variant.opt_value_id,
    //                         option_id: variant.option_value.option.id,
    //                         option: variant.option_value.option.name,
    //                         option_value: variant.option_value.value,

    //                     })
    //                 })


    //             }
    //             )
    //         })
    //         res.send(resObj);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });

};

exports.getStockBySubCatId = async (req, res) => {
    const id = req.params.id;
    let {data, count} = await stockService.getStockBySubCatId(id);
    res.json({
        result: 0,
        count: count,
        data: data
    })
    // Product.belongsTo(MainCategory, { foreignKey: 'category_id' })
    // MainCategory.hasMany(Product, { foreignKey: 'category_id' })
    // SubCategory.hasMany(Product, { foreignKey: "sub_cat_id" });
    // Product.belongsTo(SubCategory, { foreignKey: "sub_cat_id" });
    // Product.hasMany(Stock, { foreignKey: 'product_id' })
    // Stock.belongsTo(Product, { foreignKey: 'product_id' })
    // Stock.hasMany(Variant, { foreignKey: 'stock_id' })
    // Variant.belongsTo(Stock, { foreignKey: 'stock_id' })
    // Variant.belongsTo(OptionValue, { foreignKey: 'opt_value_id' })
    // OptionValue.hasMany(Variant, { foreignKey: 'opt_value_id' })
    // OptionValue.belongsTo(Option, { foreignKey: 'option_id' })
    // Option.hasMany(OptionValue, { foreignKey: 'option_id' })

    // Stock.findAll({
    //     where: {}, include: [
    //         {
    //             model: Product,
    //             where: { sub_cat_id: id },
    //             include: [
    //                 {
    //                     model: MainCategory
    //                 },
    //                 {
    //                     model: SubCategory
    //                 },
    //             ]
    //         },
    //         {
    //             model: Variant,
    //             include: [
    //                 {
    //                     model: OptionValue,
    //                     include: [
    //                         Option
    //                     ]
    //                 }
    //             ]
    //         },

    //     ]
    // })
    //     .then(data => {

    //         const resObj = data.map(stock => {
    //             return Object.assign(
    //                 {}, {
    //                 id: stock.id,
    //                 // product_name: stock.product.title,
    //                 // main_category: stock.product.main_category.title,
    //                 // sub_category: stock.product.sub_category.title,
    //                 price: stock.price,
    //                 qty: stock.qty,
    //                 code: stock.code,
    //                 product: stock.product,

    //                 variants: stock.variants.map(variant => {
    //                     return Object.assign({}, {
    //                         variant_id: variant.id,
    //                         opt_value_id: variant.opt_value_id,
    //                         option_id: variant.option_value.option.id,
    //                         option: variant.option_value.option.name,
    //                         option_value: variant.option_value.value,

    //                     })
    //                 })


    //             }
    //             )
    //         })
    //         res.send(resObj);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });
}

// Find a single Stock with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Stock.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Stock with id=" + id
            });
        });
};

// Update a Stock by the id in the request

exports.updateStock = (req, res) => {

};
exports.update = (req, res) => {
    const id = req.params.id;
    const variants = req.body.variants;
    let variant = {}
    let finish = false;
    let updateStock = {
        product_id: req.body.product_id,
        qty: req.body.qty,
        price: req.body.price,
        code: req.body.code
    }

    Stock.update(updateStock, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                for (let data of variants) {
                    variant = {
                        // stock_id: id,
                        opt_value_id: data.opt_value_id
                    }
                    Variant.update(variant, { where: { id: data.variant_id } }).then(result => {
                        finish = true
                        res.send({
                            message: "Stock was updated successfully."
                        });
                    })
                }

                // Variant.destroy({ where: { stock_id: id } }).then(ss => {
                //     for (let data of variants) {
                //         variant = {
                //             stock_id: id,
                //             opt_value_id: data.opt_value_id
                //         }

                //         Variant.create(variant).then(result => {
                //             finish = true
                //             res.send({
                //                 message: "Stock was updated successfully."
                //             });
                //         }).catch(e => {
                //             finish = false
                //         })
                //     }
                // })

                if (finish) {
                    res.send({
                        message: "Stock was updated successfully."
                    });
                }

            } else {
                res.send({
                    message: `Cannot update Stock with id=${id}. Maybe Stock was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Stock with id=" + id
            });
        });
};

// Delete a Stock with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Stock.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                Variant.destroy({ where: { stock_id: id } }).then(data => {
                    if (data) {
                        res.send({
                            message: "Stock was deleted successfully!"
                        });
                    } else {
                        res.send({
                            message: "Variant Delete ERROR"
                        })
                    }
                })

            } else {
                res.send({
                    message: `Cannot delete Stock with id=${id}. Maybe Stock was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Stock with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Stock.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Stock.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};