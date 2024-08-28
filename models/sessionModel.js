const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Session = sequelize.define('Session', {
  session_id: {
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
  device_info: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'Sessions',
  timestamps: false,
});

User.hasMany(Session, { foreignKey: '_id' });
Session.belongsTo(User, { foreignKey: '_id' });

module.exports = Session;
