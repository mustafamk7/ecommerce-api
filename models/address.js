module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Address", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    houseNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "House number is required" },
        len: {
          args: [1, 100],
          msg: "House number must be between 1 and 100 characters",
        },
      },
    },
    landmark: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "City is required" },
        len: {
          args: [2, 50],
          msg: "City name must be between 2 and 50 characters",
        },
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "State is required" },
        len: {
          args: [2, 50],
          msg: "State name must be between 2 and 50 characters",
        },
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Country is required" },
        len: {
          args: [2, 50],
          msg: "Country name must be between 2 and 50 characters",
        },
      },
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Zip code is required" },
        isNumeric: { msg: "Zip code must be numeric" },
        len: {
          args: [5, 10],
          msg: "Zip code must be between 5 and 10 characters",
        },
      },
    },
  });
};
