module.exports = (sequelize, Sequelize) => {
    const SubCategory = sequelize.define("sub_category", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive')
        },
        parent_id: {
            type: Sequelize.INTEGER
        }
    });

    return SubCategory;
};