const db = require("../models");
const OptionValue = db.optionValue;

exports.getAllOptionValue = async () => {
    let { rows: data, count } = await OptionValue.findAndCountAll({ distinct: true, where: {} });

    return { data, count }
}

exports.getOptionValueById = async (id) => {
    let data = await OptionValue.findByPk(id)

    return data;
}