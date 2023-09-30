module.exports = (sequelize, Sequelize) => {
    const ProduseListateCategorii = sequelize.define("produse_categorii", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
    }, {
        timestamps: false
    });
    return ProduseListateCategorii;
};