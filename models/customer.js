const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'First name is required' },
        len: { args: [2, 50], msg: 'First name must be between 2 and 50 characters' },
      },
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Last name is required' },
        len: { args: [2, 50], msg: 'Last name must be between 2 and 50 characters' },
      },
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This email is already in use',
      },
      validate: {
        notNull: { msg: 'Email is required' },
        isEmail: { msg: 'Must be a valid email address' },
        len: { args: [15, 255], msg: 'Email length must be between 5 and 255 characters' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required' },
        len: { args: [6, 100], msg: 'Password must be at least 6 characters' },
      },
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Phone number is required' },
        isNumeric: { msg: 'Phone number must contain only numbers' },
        len: { args: [10, 15], msg: 'Phone number must be between 10 and 15 digits' },
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  });


  Customer.beforeSave(async (customer) => {
    if (customer.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      customer.password = await bcrypt.hash(customer.password, salt);
    }
  });

  Customer.prototype.validPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };

  return Customer;
};
