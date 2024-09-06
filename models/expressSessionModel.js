const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ExpressSession = sequelize.define('ExpressSession', {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  sess: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  expire: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'express_sessions',
  timestamps: false,
});

module.exports = ExpressSession;
