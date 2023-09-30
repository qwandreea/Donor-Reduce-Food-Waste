module.exports = (sequelize, Sequelize) => {
    const Adrese = sequelize.define("adrese", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        strada: {
            type: Sequelize.STRING,
            allowNull: false
        },
        numar: {
            type: Sequelize.STRING,
            allowNull: false
        },
        oras: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        paranoid: true
    });
    return Adrese;
};