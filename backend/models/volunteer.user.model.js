module.exports = (sequelize, Sequelize) => {
const VolunteerUser = sequelize.define("volunteer_users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    represented_organisation: {
      type: Sequelize.STRING,
    },
  }, {
    timestamps: true
  });

  return VolunteerUser;
};
