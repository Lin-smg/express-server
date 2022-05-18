module.exports = (sequelize, Sequelize) => {
    const Variant = sequelize.define("variant", {
        stock_id: {
            type: Sequelize.INTEGER
        },
        opt_value_id: {
            type: Sequelize.INTEGER
        }
    });

    return Variant;
};