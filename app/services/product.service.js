const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require("../models");
const User = db.User
const Product = db.products;
const MainCategory = db.mainCategory;
const SubCategory = db.subCategory;
const Stock = db.stock;
const Variant = db.variant;
const Option = db.option;
const OptionValue = db.optionValue;

exports.addProduct = async (product) => {
    let data = await Product.create(product);

    return data;
    // Product.create(product)
    //     .then(data => {
    //         res.status(200).send({
    //             result: 0,
    //             message: "successful",
    //             data: data
    //         });
    //         // res.status(500).send({
    //         //     message:
    //         //         "Some error occurred while creating the Product."
    //         // });
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             result: 1,
    //             message:
    //                 err.message || "Some error occurred while creating the Product."
    //         });
    //     });
}

exports.updateProduct = async (product, id) => {
    let data = await Product.update(product, {
        where: { id: id }
    })

    return data
}

exports.getAllProductByOption = async (option, mainCatOption) => {
    MainCategory.hasMany(Product, { foreignKey: "category_id" });
    Product.belongsTo(MainCategory, { foreignKey: "category_id" });

    SubCategory.hasMany(Product, { foreignKey: "sub_cat_id" });
    Product.belongsTo(SubCategory, { foreignKey: "sub_cat_id" });

    let { rows: data, count } = await Product.findAndCountAll({
        distinct: true,
        ...option, include: [{ model: MainCategory, ...mainCatOption }, { model: SubCategory }], order: [
            ['id', 'ASC'],
        ],
    })

    return { data, count }
}

exports.getAllProduct = async () => {
    MainCategory.hasMany(Product, { foreignKey: "category_id" });
    Product.belongsTo(MainCategory, { foreignKey: "category_id" });

    SubCategory.hasMany(Product, { foreignKey: "sub_cat_id" });
    Product.belongsTo(SubCategory, { foreignKey: "sub_cat_id" });

    let { rows: data, count } = await Product.findAndCountAll({
        where: {}, include: [MainCategory, SubCategory], order: [
            ['id', 'ASC'],
        ],
    })
    // .then(data => {
    //     console.log('length >>> ', data.length())
    //     return {
    //         result: 0,
    //         data: data
    //     }
    // })
    // .catch(err => {
    //     return {
    //         result: 1,
    //         message:  err.message || "Some error occurred while retrieving all products."
    //     }
    // });

    return { data, count }
}

exports.getProductById = async (id) => {
    Product.belongsTo(MainCategory, { foreignKey: 'category_id' })
    MainCategory.hasMany(Product, { foreignKey: 'category_id' })
    SubCategory.hasMany(Product, { foreignKey: "sub_cat_id" });
    Product.belongsTo(SubCategory, { foreignKey: "sub_cat_id" });
    Product.hasMany(Stock, { foreignKey: 'product_id' })
    Stock.belongsTo(Product, { foreignKey: 'product_id' })
    Stock.hasMany(Variant, { foreignKey: 'stock_id' })
    Variant.belongsTo(Stock, { foreignKey: 'stock_id' })
    Variant.belongsTo(OptionValue, { foreignKey: 'opt_value_id' })
    OptionValue.hasMany(Variant, { foreignKey: 'opt_value_id' })
    OptionValue.belongsTo(Option, { foreignKey: 'option_id' })
    Option.hasMany(OptionValue, { foreignKey: 'option_id' })
    let product = await Product.findOne({
        where: { id: id }, include: [
            {
                model: MainCategory
            },
            {
                model: SubCategory
            },
            {
                model: Stock,
                include: [
                    {
                        model: Variant,
                        include: [
                            {
                                model: OptionValue,
                                include: [
                                    Option
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })
    if (!product) {
        return null
    }
    const resObj =
        // data.map(product => {
        Object.assign(
            {}, {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            ratings: product.ratings,
            imgUrl: product.imgUrl,
            longDescription: product.longDescription,
            status: product.status,
            quantity: product.quantity,

            stocks: product.stocks.map(stock => {
                return Object.assign(
                    {}, {
                    code: stock.code,
                    title: product.title,
                    product_id: product.id,
                    ratings: product.ratings,
                    stock_id: stock.id,
                    stock_price: stock.price,
                    stock_qty: stock.qty,
                    main_category: product.main_category.title,
                    sub_category: product.sub_category.title,

                    variants: stock.variants.map(variant => {
                        return Object.assign({}, {
                            variant_id: variant.id,
                            opt_value_id: variant.opt_value_id,
                            option: variant.option_value.option.name,
                            option_value: variant.option_value.value,

                        })
                    })

                })
            })
        }
        )
    // })
    return resObj
}

exports.getProductBySubCatId = async (id) => {
    Product.belongsTo(MainCategory, { foreignKey: 'category_id' })
    MainCategory.hasMany(Product, { foreignKey: 'category_id' })
    SubCategory.hasMany(Product, { foreignKey: "sub_cat_id" });
    Product.belongsTo(SubCategory, { foreignKey: "sub_cat_id" });
    Product.hasMany(Stock, { foreignKey: 'product_id' })
    Stock.belongsTo(Product, { foreignKey: 'product_id' })
    Stock.hasMany(Variant, { foreignKey: 'stock_id' })
    Variant.belongsTo(Stock, { foreignKey: 'stock_id' })
    Variant.belongsTo(OptionValue, { foreignKey: 'opt_value_id' })
    OptionValue.hasMany(Variant, { foreignKey: 'opt_value_id' })
    OptionValue.belongsTo(Option, { foreignKey: 'option_id' })
    Option.hasMany(OptionValue, { foreignKey: 'option_id' })
    let data = await Product.findAll({
        where: { sub_cat_id: id }, include: [
            {
                model: MainCategory
            },
            {
                model: SubCategory
            },
            {
                model: Stock,
                include: [
                    {
                        model: Variant,
                        include: [
                            {
                                model: OptionValue,
                                include: [
                                    Option
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })

    if (!data) {
        return null
    }

    const resObj = data.map(product => {
        return Object.assign(
            {}, {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            rating: product.rating,
            imgUrl: product.imgUrl,
            longDescription: product.longDescription,
            status: product.status,
            quantity: product.quantity,

            stocks: product.stocks.map(stock => {
                return Object.assign(
                    {}, {
                    title: product.title,
                    product_id: product.id,
                    stock_id: stock.id,
                    stock_price: stock.price,
                    stock_qty: stock.qty,
                    main_category: product.main_category.title,
                    sub_category: product.sub_category.title,

                    variants: stock.variants.map(variant => {
                        return Object.assign({}, {
                            variant_id: variant.id,
                            opt_value_id: variant.opt_value_id,
                            option: variant.option_value.option.name,
                            option_value: variant.option_value.value,

                        })
                    })

                })
            })
        }
        )
    })
    return resObj

}

exports.getProductByOption = async (option) => {
    let { rows: data, count } = await Product.findAndCountAll(option)
    return { data, count }
}

exports.deleteProduct = async (id) => {
    let data = await Product.destroy({
        where: { id: id }
    });

    return data;
}