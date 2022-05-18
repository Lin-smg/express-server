const db = require("../models");
const Variant = db.variant;
const Op = db.Sequelize.Op;

exports.getAllVariant = async () => {
    let { rows: data, count } = await Variant.findAndCountAll({ distinct: true, where: {} });

    return { data, count }
}

exports.getVariantById = async (id) => {
    let data = await Variant.findByPk(id);

    return data
}