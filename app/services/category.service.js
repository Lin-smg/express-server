const { subCategory } = require("../models");
const db = require("../models");
const MainCategory = db.mainCategory;
const SubCategory = db.subCategory
const Product = db.products
const Op = db.Sequelize.Op;

exports.createMainCategory = async (mainCategory) => {
    let data = await MainCategory.create(mainCategory)

    return data
}

exports.createSubCategory = async (subCategory) => {
    let data = await SubCategory.create(subCategory);

    return data
}

exports.updateMainCategory = async (value, id) => {
    let data = await MainCategory.update(value, {
        where: { id: id }
    })

    return data
}

exports.updateSubCategory = async (value, id) => {
    let data = await SubCategory.update(value, {
        where: { id: id }
    })

    return data
}

exports.getAllMainCategory = async () => {
    let { rows: data, count } = await MainCategory.findAndCountAll();
    return { data, count }
}

exports.getAllSubCategory = async () => {
    MainCategory.hasMany(SubCategory, { foreignKey: 'parent_id' })
    SubCategory.belongsTo(MainCategory, { foreignKey: 'parent_id' })

    let { rows: data, count } = await SubCategory.findAndCountAll({ where: {}, include: [MainCategory] });

    return { data, count }
}

exports.getAllMainSubCategory = async () => {
    MainCategory.hasMany(SubCategory, { foreignKey: 'parent_id' })
    SubCategory.belongsTo(MainCategory, { foreignKey: 'parent_id' })

    let { rows: data, count } = await MainCategory.findAndCountAll({ distinct: true, where: {}, include: [SubCategory] });

    return { data, count }
}

exports.getSubCategoryByOption = async (option) => {
    let data = await SubCategory.findOne(option)
    return data
}

exports.deleteMainCategory = async (id) => {
    let data = await MainCategory.destroy({
        where: { id: id }
    })

    return data;
}

exports.deleteSubCategory = async (id) => {
    let data = await SubCategory.destroy({
        where: { id: id }
    })

    return data;
}