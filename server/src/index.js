require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, initDatabase } = require('./config/sequelize');
const Plugin = require('./models/plugin');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use('/uploads', express.static('uploads'));

// API路由
app.get('/api/plugins', async (req, res, next) => {
  try {
    console.log('GET /api/plugins - 获取插件列表');
    const plugins = await Plugin.findAll();
    res.json(plugins);
  } catch (error) {
    console.error('获取插件列表失败:', error);
    next(error);
  }
});

app.get('/api/plugins/:id', async (req, res, next) => {
  try {
    console.log(`GET /api/plugins/${req.params.id} - 获取插件详情`);
    const plugin = await Plugin.findByPk(req.params.id);
    if (plugin) {
      res.json(plugin);
    } else {
      res.status(404).json({ message: '插件未找到' });
    }
  } catch (error) {
    console.error('获取插件详情失败:', error);
    next(error);
  }
});

app.post('/api/plugins', async (req, res, next) => {
  try {
    console.log('POST /api/plugins - 创建新插件');
    const plugin = await Plugin.create(req.body);
    res.status(201).json(plugin);
  } catch (error) {
    console.error('创建插件失败:', error);
    next(error);
  }
});

app.put('/api/plugins/:id', async (req, res, next) => {
  try {
    console.log(`PUT /api/plugins/${req.params.id} - 更新插件`);
    const plugin = await Plugin.findByPk(req.params.id);
    if (plugin) {
      await plugin.update(req.body);
      res.json(plugin);
    } else {
      res.status(404).json({ message: '插件未找到' });
    }
  } catch (error) {
    console.error('更新插件失败:', error);
    next(error);
  }
});

app.delete('/api/plugins/:id', async (req, res, next) => {
  try {
    console.log(`DELETE /api/plugins/${req.params.id} - 删除插件`);
    const plugin = await Plugin.findByPk(req.params.id);
    if (plugin) {
      await plugin.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: '插件未找到' });
    }
  } catch (error) {
    console.error('删除插件失败:', error);
    next(error);
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('错误详情:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 初始化数据库并启动服务器
initDatabase()
  .then(() => sequelize.sync({ force: false }))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`服务器运行在 http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('服务器启动失败:', err);
    process.exit(1);
  });