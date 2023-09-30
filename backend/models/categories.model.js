module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("categories", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        label: {
            type: Sequelize.STRING,
            allowNull: false
        },
        parent_id: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });


    return Categories;
};
