const { Sequelize, DataTypes } = require('sequelize');

// define the Sequelize connection
const sequelize = new Sequelize('gym_management_system', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// define the User model
const User = sequelize.define('User', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  familyName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  shift: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

// export the User model as a module
module.exports = User;