const db = require("../models");
const Stock = db.stock;
const OptionValue = db.optionValue;
const Product = db.products;
const Variant = db.variant;
const Option = db.option;
const MainCategory = db.mainCategory;
const SubCategory = db.subCategory;

exports.getAllStock = async () => {
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

    let { rows: data, count } = await Stock.findAndCountAll({ // offset: 0, limit: 2,
        where: {}, include: [
            {
                model: Product,
                include: [
                    {
                        model: MainCategory
                    },
                    {
                        model: SubCategory
                    },
                ]
            },
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
            },

        ]
    })

    if (!data) {
        return []
    }

    data = data.map(stock => {
        return Object.assign(
            {}, {
            id: stock.id,
            // product_name: stock.product.title,
            // main_category: stock.product.main_category.title,
            // sub_category: stock.product.sub_category.title,
            price: stock.price,
            qty: stock.qty,
            code: stock.code,
            product: stock.product,

            variants: stock.variants.map(variant => {
                return Object.assign({}, {
                    variant_id: variant.id,
                    opt_value_id: variant.opt_value_id,
                    option_id: variant.option_value.option.id,
                    option: variant.option_value.option.name,
                    option_value: variant.option_value.value,

                })
            })


        }
        )
    })

    return { data, count }
}

exports.getStockBySubCatId = async (id) => {
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

    let { rows: data, count } = await Stock.findAndCountAll({
        where: {}, include: [
            {
                model: Product,
                where: { sub_cat_id: id },
                include: [
                    {
                        model: MainCategory
                    },
                    {
                        model: SubCategory
                    },
                ]
            },
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
            },

        ]
    })


    if (!data) {
        return []
    }

    data = data.map(stock => {
        return Object.assign(
            {}, {
            id: stock.id,
            // product_name: stock.product.title,
            // main_category: stock.product.main_category.title,
            // sub_category: stock.product.sub_category.title,
            price: stock.price,
            qty: stock.qty,
            code: stock.code,
            product: stock.product,

            variants: stock.variants.map(variant => {
                return Object.assign({}, {
                    variant_id: variant.id,
                    opt_value_id: variant.opt_value_id,
                    option_id: variant.option_value.option.id,
                    option: variant.option_value.option.name,
                    option_value: variant.option_value.value,

                })
            })


        }
        )
    })

    return { data, count }

}

exports.getStockByOption = async (option) => {
    let data = await Stock.findOne(option);

    return data
}