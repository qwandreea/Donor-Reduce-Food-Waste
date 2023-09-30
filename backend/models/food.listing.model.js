module.exports = (sequelize, Sequelize) => {
    const FoodListing = sequelize.define("listed_items", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
           allowNull: false
        },
        description: {
            type: Sequelize.STRING,
           allowNull: false
        },
        state: {
            type: Sequelize.STRING,
           allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
        quantity:{
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        units:{
            type: Sequelize.STRING,
            allowNull: false
        },
        expiringDate:{
            type: Sequelize.DATE,
            allowNull: false
        },
        pickupInterval:{
            type: Sequelize.STRING,
            allowNull: false
        },
        price:{
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        isDonating: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        isActive:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        lat:{
            type: Sequelize.DECIMAL(8,6),
            allowNull: true,
        },
        long:{
            type: Sequelize.DECIMAL(8,6),
            allowNull: true,
        }
    }, 
    {
        timestamps: true
    });

    return FoodListing;
};
