const db = require("../models");
const Brand = db.Brand;

exports.addBrand = async (brand) => {
    let data = await Brand.create(brand);

    return data;
}

exports.updateBrand = async (brand, id) => {
    let data = await Brand.updateBrand(brand,
        {
            where: { id: id }
        }
    )
    return data;
}

exports.delete = async (id) => {
    let data = await Brand.destroy({
        where: { id: id }
    });

    return data;
}

exports.getAllBrand = async () => {
    let { rows: data, count } = await Brand.findAndCountAll({});

    return { data, count }
}

exports.getBrandById = async (id) => {
    let data = await Brand.findByPk(id);

    return data;
}

exports.getBrandByOption = async (option) => {
    let { rows: data, count } = await Brand.findAndCountAll(option);

    return { data, count }
}