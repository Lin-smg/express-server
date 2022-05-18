module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        photo: {
            type: Sequelize.STRING
        },
        user_name: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive')
        }
    });

    return User;
};