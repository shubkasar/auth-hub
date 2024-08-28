const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const AuthProvider = sequelize.define('AuthProvider', {
  provider_id: {
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
  provider_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provider_uid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Auth_providers',
  timestamps: false,
});

User.hasMany(AuthProvider, { foreignKey: '_id' });
AuthProvider.belongsTo(User, { foreignKey: '_id' });

module.exports = AuthProvider;
