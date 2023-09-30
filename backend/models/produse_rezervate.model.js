module.exports = (sequelize, Sequelize) => {
    const ItemsRezervate = sequelize.define("produse_rezervate", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
    }, {
        timestamps: true
    });
    return ItemsRezervate;
};