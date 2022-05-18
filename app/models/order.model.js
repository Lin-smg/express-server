module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("Order", {
        order_number: {
            type: Sequelize.STRING
        },
        customer_id: {
            type: Sequelize.INTEGER
        },
        supplier_id: {
            type: Sequelize.INTEGER
        },
        total: {
            type: Sequelize.DECIMAL
        },
        product_discount: {
            type: Sequelize.DECIMAL
        },
        order_discount: {
            type: Sequelize.DECIMAL
        },
        total_discount: {
            type: Sequelize.DECIMAL
        },
        product_tax: {
            type: Sequelize.DECIMAL
        },
        order_tax: {
            type: Sequelize.DECIMAL
        },
        total_tax: {
            type: Sequelize.DECIMAL
        },
        grand_total: {
            type: Sequelize.DECIMAL
        },
        total_items: {
            type: Sequelize.DECIMAL
        },
        total_qty: {
            type: Sequelize.DECIMAL
        },
        created_by: {
            type: Sequelize.INTEGER
        },
        note: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.ENUM,
            value: ['active', 'pending', 'deleted']
        },
        date: {
            type: Sequelize.DATETIME
        }
    });

    return Order;
};