const { Sequelize } = require('sequelize');
const config = require('./database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: console.log,
    dialectOptions: {
      charset: 'utf8mb4'
    }
  }
);

// 先创建数据库（如果不存在），然后再进行连接
const initDatabase = async () => {
  try {
    // 创建一个临时连接来创建数据库
    const tempSequelize = new Sequelize(null, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect
    });

    await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database};`);
    await tempSequelize.close();

    // 测试主连接
    await sequelize.authenticate();
    console.log('数据库连接成功');
  } catch (err) {
    console.error('数据库初始化失败:', err);
    throw err;
  }
};

// 导出初始化函数和sequelize实例
module.exports = { sequelize, initDatabase };