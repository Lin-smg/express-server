module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        name: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.TEXT
        },
        address: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.ENUM('0', '1')
        },
    });

    return Customer;
};
