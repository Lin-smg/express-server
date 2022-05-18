module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        category_id: {
            type: Sequelize.INTEGER
        },
        sub_cat_id: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.DOUBLE
        },
        ratings: {
            type: Sequelize.INTEGER
        },
        reviews: {
            type: Sequelize.INTEGER
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        imgUrl: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive')
        },
        longDescription: {
            type: Sequelize.TEXT
        },
        thumbs: {
            type: Sequelize.TEXT
        }
    });

    return Product;
};