module.exports = (sequelize, Sequelize) => {
  const BusinessUsers = sequelize.define("business_users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    cif: {
      type: Sequelize.STRING
    },
    business_name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: true
  });

  return BusinessUsers;
}