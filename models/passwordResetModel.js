const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const PasswordReset = sequelize.define('PasswordReset', {
  reset_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  _id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: '_id',
    },
  },
  reset_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  used: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'Password_resets',
  timestamps: false,
});

User.hasMany(PasswordReset, { foreignKey: '_id' });
PasswordReset.belongsTo(User, { foreignKey: '_id' });

module.exports = PasswordReset;