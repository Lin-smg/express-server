module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        is_parent: {
            type: Sequelize.BOOLEAN
        },
        parent_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive')
        }
    });

    return Category;
};