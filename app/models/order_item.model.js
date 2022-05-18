module.exports = (sequelize, Sequelize) => {
    const Order_Item = sequelize.define("Order_Item", {
        order_id: {
            type: Sequelize.INTEGER
        },
        product_id: {
            type: Sequelize.INTEGER
        },
        qty: {
            type: Sequelize.DECIMAL
        },
        unit_price: {
            type: Sequelize.DOUBLE
        },
        total_price: {
            type: Sequelize.DOUBLE
        }
    });

    return Order_Item;
};