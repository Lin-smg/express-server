module.exports = (sequelize, Sequelize) => {
    const OptionValue = sequelize.define("option_value", {
        option_id: {
            type: Sequelize.INTEGER
        },
        value: {
            type: Sequelize.STRING
        }
    });

    return OptionValue;
};