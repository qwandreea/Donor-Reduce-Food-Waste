module.exports = (sequelize, Sequelize) => {
    const CereriProduse = sequelize.define("cerere_produse", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        status_cerere: {
            type: Sequelize.STRING, //In progres, Aprobat, Respins => la creare e In progres
            allowNull: false
        },
        timp_ridicare: {
            type: Sequelize.DATE,
            allowNull: true //Setat de Voluntar daca cererea este aprobata
        }
    }, {
        timestamps: true
    });
    return CereriProduse;
};