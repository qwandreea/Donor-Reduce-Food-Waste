module.exports = (sequelize, Sequelize) => {

  const User = sequelize.define("users", {
    userid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: { args: true, msg: "Email is not valid." }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tip: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: true
  });

  return User;
};

//1. Define the model