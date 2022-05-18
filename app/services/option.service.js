
const db = require("../models");
const Option = db.option;
const OptionValue = db.optionValue;

exports.getProductSubAttributes = async () => {
    OptionValue.belongsTo(Option, { foreignKey: 'option_id' });
    Option.hasMany(OptionValue, { foreignKey: 'option_id' })
    let { rows: data, count } = await OptionValue.findAndCountAll({ distinct: true, where: {}, include: [Option] })

    return { data, count }
}

exports.getProductMainAttributes = async () => {
    OptionValue.belongsTo(Option, { foreignKey: 'option_id' });
    Option.hasMany(OptionValue, { foreignKey: 'option_id' })
    let { rows: data, count } = await Option.findAndCountAll({ distinct: true, where: {}, include: [OptionValue] })

    return { data, count }
}