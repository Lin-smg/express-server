module.exports = (sequelize, Sequelize) => {
    const Stock = sequelize.define("stock", {
        product_id: {
            type: Sequelize.INTEGER
        },
        qty: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.DOUBLE
        },
        code: {
            type: Sequelize.STRING
        }
    });

    return Stock;
};