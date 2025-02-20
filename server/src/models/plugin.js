const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Plugin = sequelize.define('Plugin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: '插件名称是必需的' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: '插件描述是必需的' }
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: '插件图片URL是必需的' }
    }
  },
  downloadUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: '插件下载URL是必需的' }
    }
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: '使用说明是必需的' }
    }
  },
  downloads: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  }
}, {
  timestamps: true
});

module.exports = Plugin;