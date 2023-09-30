module.exports = (sequelize, Sequelize) => {
    const Reviews = sequelize.define("reviews", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        titlu: {
            type: Sequelize.STRING, //In progres, Aprobat, Respins => la creare e In progres
            allowNull: false
        },
        descriere: {
            type: Sequelize.STRING,
            allowNull: true //Setat de Voluntar daca cererea este aprobata
        }
    }, {
        timestamps: true
    });
    return Reviews;
};