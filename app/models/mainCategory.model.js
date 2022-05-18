module.exports = (sequelize, Sequelize) => {
    const MainCategory = sequelize.define("main_category", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive')
        }
    });

    return MainCategory;
};