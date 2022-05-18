module.exports = (sequelize, Sequelize) => {
    const Option = sequelize.define("option", {

        name: {
            type: Sequelize.STRING
        }
    });

    return Option;
};