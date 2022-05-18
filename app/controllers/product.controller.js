const db = require("../models");
const { Op } = require("sequelize");
const Product = db.products;
const MainCategory = db.mainCategory;
const SubCategory = db.subCategory;
const Stock = db.stock;
const Variant = db.variant;
const Option = db.option;
const OptionValue = db.optionValue;
const fs = require("fs");
const path = require("path");
const ProductService = require('../services/product.service');
const stockService = require("../services/stock.service")
const imageHelper = require("../helper/imageHelper");
// const multer = require("multer")

// const upload = multer({
//     dest: './uploads'
// })

// Create and Save a new Product
exports.create = async (req, res) => {
    // if (!req.body.title) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Product
    const product = {
        title: req.body.title,
        description: req.body.description,

        category_id: req.body.category,
        sub_cat_id: req.body.subCat,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        // ratings: req.body.ratings,
        // reviews: req.body.reviews,
        quantity: req.body.quantity,
        // imgUrl: req.body.imgUrl,
        status: req.body.status,
        longDescription: req.body.longDescription,
        // thumbs: req.body.thumbs
    };

    // Save Product in the database
    Product.create(product)
        .then(data => {
            res.status(200).send(data);
            // res.status(500).send({
            //     message:
            //         "Some error occurred while creating the Product."
            // });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
};

exports.createProduct = async (req, res) => {

    // var file_name = new Date().getTime() + ".png";
    // const tempPath = path.join(__dirname, "../../" + req.file.path);
    // const targetPath = path.join(__dirname, "../../assets/images/products/" + file_name);

    let data = JSON.parse(req.body.data);
    var file_name = data.imgUrl ? data.imgUrl : new Date().getTime() + ".png";
    console.log(req.file)
    if (req.file) {
        imageHelper.saveImage("../../" + req.file.path, "../../assets/images/products/" + file_name)
    } else {
        file_name = null
    }

    // fs.renameSync(tempPath, targetPath)
    const product = {
        title: data.title,
        description: data.description,

        category_id: data.category,
        sub_cat_id: data.subCat,
        title: data.title,
        description: data.description,
        price: data.price,
        // ratings: req.body.ratings,
        // reviews: req.body.reviews,
        quantity: data.quantity,
        imgUrl: file_name,
        status: data.status,
        longDescription: data.longDescription,
        // thumbs: req.body.thumbs
    };

    let result = await ProductService.addProduct(product)

    if (result) {
        res.send({
            result: 0,
            message: "successful",
            data: result
        })
    } else {
        res.send({
            result: 1,
            message: "add product failed"
        })
    }

};

exports.uploadImg = (req, res) => {

    console.log(JSON.parse(req.body.data))
    var file_name = new Date().getTime() + ".png";
    const tempPath = path.join(__dirname, "../../" + req.file.path);
    const targetPath = path.join(__dirname, "../../assets/images/products/" + file_name);


    fs.renameSync(tempPath, targetPath)

    res.json({ file: req.file })
}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    console.log('request', req.body);
    db.sequelize.query('SELECT * FROM products,categories WHERE products.category_id=categories.id & categories.id = (:id)', {
        replacements: { id: 1 },
        type: db.sequelize.QueryTypes.SELECT
    }).then(data => {
        console.log('response', data)
        res.send(data);
    });

    // Product.findAll()
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });
};

exports.getAllProductByOption = async (req, res) => {

    let { pageSize, pageIndex, searchKey, searchBy } = req.body
    let limitNum = pageSize;
    let offSetNum = (pageIndex - 1) * pageSize;
    let option = {}
    let mainCatOption = {}
    if (pageSize && pageIndex) {
        option.offset = offSetNum
        option.limit = limitNum
    }
    if (searchKey) {
        switch (searchBy) {
            case "product":
                option.where = {

                    [Op.or]: [
                        {
                            title: {
                                [Op.like]: `%${searchKey}%`
                            }
                        }
                    ]

                };
                break;
            case "mainCategory":
                mainCatOption.where = {
                    [Op.or]: [
                        {
                            title: {
                                [Op.like]: `%${searchKey}%`
                            }
                        }
                    ]
                }
                break;
        }

    }

    let { data, count } = await ProductService.getAllProductByOption(option, mainCatOption);
    res.send({
        result: 0,
        count: count,
        data: data
    })
}

exports.getAllProduct = async (req, res, next) => {
    // console.log('params', typeof req.params.length || 'true')
    // let { pageSize, pageIndex } = typeof req.params.data != 'undefined' ? JSON.parse(req.params.data) : 0
    // let limitNum = pageSize;
    // let offSetNum = (pageIndex - 1) * pageSize;
    // let option = {}
    // if (pageSize && pageIndex) {
    //     option.offset = offSetNum
    //     option.limit = limitNum
    // }

    let { data, count } = await ProductService.getAllProduct();
    res.send({
        result: 0,
        count: count,
        data: data
    })

    // res.json(data)

    // MainCategory.hasMany(Product, { foreignKey: "category_id" });
    // Product.belongsTo(MainCategory, { foreignKey: "category_id" });

    // SubCategory.hasMany(Product, { foreignKey: "sub_cat_id" });
    // Product.belongsTo(SubCategory, { foreignKey: "sub_cat_id" });

    // Product.findAll({
    //     where: {}, include: [MainCategory, SubCategory], order: [
    //         ['id', 'ASC'],
    //     ],
    // })
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });
};

exports.getProductById = async (req, res) => {
    const id = req.params.id;

    let data = await ProductService.getProductById(id)

    res.send({
        result: 0,
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
    // Product.findOne({
    //     where: { id: id }, include: [
    //         {
    //             model: MainCategory
    //         },
    //         {
    //             model: SubCategory
    //         },
    //         {
    //             model: Stock,
    //             include: [
    //                 {
    //                     model: Variant,
    //                     include: [
    //                         {
    //                             model: OptionValue,
    //                             include: [
    //                                 Option
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // })
    //     .then(product => {

    //         const resObj =
    //             // data.map(product => {
    //             Object.assign(
    //                 {}, {
    //                 id: product.id,
    //                 title: product.title,
    //                 description: product.description,
    //                 price: product.price,
    //                 ratings: product.ratings,
    //                 imgUrl: product.imgUrl,
    //                 longDescription: product.longDescription,
    //                 status: product.status,
    //                 quantity: product.quantity,

    //                 stocks: product.stocks.map(stock => {
    //                     return Object.assign(
    //                         {}, {
    //                         code: stock.code,
    //                         title: product.title,
    //                         product_id: product.id,
    //                         ratings: product.ratings,
    //                         stock_id: stock.id,
    //                         stock_price: stock.price,
    //                         stock_qty: stock.qty,
    //                         main_category: product.main_category.title,
    //                         sub_category: product.sub_category.title,

    //                         variants: stock.variants.map(variant => {
    //                             return Object.assign({}, {
    //                                 variant_id: variant.id,
    //                                 opt_value_id: variant.opt_value_id,
    //                                 option: variant.option_value.option.name,
    //                                 option_value: variant.option_value.value,

    //                             })
    //                         })

    //                     })
    //                 })
    //             }
    //             )
    //         // })
    //         res.send(resObj);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });
};

exports.getProductBySubCatId = async (req, res) => {
    const id = req.params.id;
    let data = await ProductService.getProductBySubCatId(id);

    res.send({
        result: 0,
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
    // Product.findAll({
    //     where: { sub_cat_id: id }, include: [
    //         {
    //             model: MainCategory
    //         },
    //         {
    //             model: SubCategory
    //         },
    //         {
    //             model: Stock,
    //             include: [
    //                 {
    //                     model: Variant,
    //                     include: [
    //                         {
    //                             model: OptionValue,
    //                             include: [
    //                                 Option
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // })
    //     .then(data => {

    //         const resObj = data.map(product => {
    //             return Object.assign(
    //                 {}, {
    //                 id: product.id,
    //                 title: product.title,
    //                 description: product.description,
    //                 price: product.price,
    //                 rating: product.rating,
    //                 imgUrl: product.imgUrl,
    //                 longDescription: product.longDescription,
    //                 status: product.status,
    //                 quantity: product.quantity,

    //                 stocks: product.stocks.map(stock => {
    //                     return Object.assign(
    //                         {}, {
    //                         title: product.title,
    //                         product_id: product.id,
    //                         stock_id: stock.id,
    //                         stock_price: stock.price,
    //                         stock_qty: stock.qty,
    //                         main_category: product.main_category.title,
    //                         sub_category: product.sub_category.title,

    //                         variants: stock.variants.map(variant => {
    //                             return Object.assign({}, {
    //                                 variant_id: variant.id,
    //                                 opt_value_id: variant.opt_value_id,
    //                                 option: variant.option_value.option.name,
    //                                 option_value: variant.option_value.value,

    //                             })
    //                         })

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

exports.getImage = (req, res) => {
    console.log(req.query)
    res.sendFile(path.join(__dirname, "../../assets/images/products/" + req.query.image));

};

exports.getUserImage = (req, res) => {
    console.log(req.query)
    res.sendFile(path.join(__dirname, "../../assets/images/users/" + req.query.image));

}

// Update a Product by the id in the request
exports.updateProductWithImg = async (req, res) => {
    const id = req.params.id;
    let data = JSON.parse(req.body.data);

    var file_name = data.imgUrl ? data.imgUrl : new Date().getTime() + ".png";
    // const tempPath = path.join(__dirname, "../../" + req.file.path);
    // const targetPath = path.join(__dirname, "../../assets/images/products/" + file_name);
    // fs.renameSync(tempPath, targetPath)
    imageHelper.saveImage("../../" + req.file.path, "../../assets/images/products/" + file_name)

    const product = {
        title: data.title,
        description: data.description,

        category_id: data.category_id,
        sub_cat_id: data.sub_cat_id,
        title: data.title,
        description: data.description,
        price: data.price,
        // ratings: req.body.ratings,
        // reviews: req.body.reviews,
        quantity: data.quantity,
        imgUrl: file_name,
        status: data.status,
        longDescription: data.longDescription,
        // thumbs: req.body.thumbs
    };

    let result = await ProductService.updateProduct(product, id)

    if (result == 1) {
        res.send({
            result: 0,
            message: "Product was updated successfully."
        })
    } else {
        res.send({
            result: 1,
            message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        })
    }
    // Product.update(product, {
    //     where: { id: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 result: 0,
    //                 message: "Product was updated successfully."
    //             });
    //         } else {
    //             res.send({
    //                 result: 1,
    //                 message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error updating Product with id=" + id
    //         });
    //     });
};
exports.update = async (req, res) => {
    const id = req.params.id;
    let data = req.body
    // var file_name = new Date().getTime() + ".png";
    // const tempPath = path.join(__dirname, "../../" + req.file.path);
    // const targetPath = path.join(__dirname, "../../assets/images/products/" + file_name);
    // fs.renameSync(tempPath, targetPath)
    const product = {
        title: data.title,
        description: data.description,

        category_id: data.category_id,
        sub_cat_id: data.sub_cat_id,
        title: data.title,
        description: data.description,
        price: data.price,
        // ratings: req.body.ratings,
        // reviews: req.body.reviews,
        quantity: data.quantity,
        status: data.status,
        longDescription: data.longDescription,
        // thumbs: req.body.thumbs
    };

    let result = await ProductService.updateProduct(product, id)

    if (result == 1) {
        res.send({
            result: 0,
            message: "Product was updated successfully."
        })
    } else {
        res.send({
            result: 1,
            message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        })
    }


};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    // const data = await Stock.findOne({ where: { product_id: id } });

    let option = { where: { product_id: id } };
    let data = await stockService.getStockByOption(option);

    if (data) {
        res.send({
            result: 1,
            message: "Option can't delete because of relation"
        });
        return;
    }

    let result = await ProductService.deleteProduct(id);

    if (result == 1) {
        res.send({
            result: 0,
            message: "Product was deleted successfully!"
        });
    } else {
        res.send({
            result: 1,
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
    }

    // Product.destroy({
    //     where: { id: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 result: 0,
    //                 message: "Product was deleted successfully!"
    //             });
    //         } else {
    //             res.send({
    //                 result: 1,
    //                 message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             result: 1,
    //             message: "Could not delete Product with id=" + id
    //         });
    //     });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Product.destroy({
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
    Product.findAll({ where: { published: true } })
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