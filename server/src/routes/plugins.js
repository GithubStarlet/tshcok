const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Plugin = require('../models/plugin');

// 获取所有插件
router.get('/', async (req, res) => {
  try {
    const plugins = await Plugin.find().sort({ createdAt: -1 });
    res.json(plugins);
  } catch (error) {
    res.status(500).json({ message: '获取插件列表失败' });
  }
});

// 获取单个插件
router.get('/:id', async (req, res) => {
  try {
    const plugin = await Plugin.findById(req.params.id);
    if (!plugin) {
      return res.status(404).json({ message: '插件不存在' });
    }
    res.json(plugin);
  } catch (error) {
    res.status(500).json({ message: '获取插件详情失败' });
  }
});

// 创建插件
router.post('/',
  [
    body('title').notEmpty().withMessage('插件名称不能为空'),
    body('description').notEmpty().withMessage('插件描述不能为空'),
    body('imageUrl').notEmpty().withMessage('插件图片URL不能为空'),
    body('downloadUrl').notEmpty().withMessage('插件下载URL不能为空'),
    body('instructions').notEmpty().withMessage('使用说明不能为空')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const plugin = new Plugin(req.body);
      await plugin.save();
      res.status(201).json(plugin);
    } catch (error) {
      res.status(500).json({ message: '创建插件失败' });
    }
  }
);

// 更新插件
router.put('/:id',
  [
    body('title').optional().notEmpty().withMessage('插件名称不能为空'),
    body('description').optional().notEmpty().withMessage('插件描述不能为空'),
    body('imageUrl').optional().notEmpty().withMessage('插件图片URL不能为空'),
    body('downloadUrl').optional().notEmpty().withMessage('插件下载URL不能为空'),
    body('instructions').optional().notEmpty().withMessage('使用说明不能为空')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const plugin = await Plugin.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!plugin) {
        return res.status(404).json({ message: '插件不存在' });
      }

      res.json(plugin);
    } catch (error) {
      res.status(500).json({ message: '更新插件失败' });
    }
  }
);

// 删除插件
router.delete('/:id', async (req, res) => {
  try {
    const plugin = await Plugin.findByIdAndDelete(req.params.id);
    if (!plugin) {
      return res.status(404).json({ message: '插件不存在' });
    }
    res.json({ message: '插件删除成功' });
  } catch (error) {
    res.status(500).json({ message: '删除插件失败' });
  }
});

// 添加评论和评分
router.post('/:id/reviews', 
  [
    body('user').notEmpty().withMessage('用户名不能为空'),
    body('comment').notEmpty().withMessage('评论内容不能为空'),
    body('rating').isFloat({ min: 0, max: 5 }).withMessage('评分必须在0-5之间')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const plugin = await Plugin.findById(req.params.id);
      if (!plugin) {
        return res.status(404).json({ message: '插件不存在' });
      }

      plugin.reviews.push(req.body);
      
      // 更新平均评分
      const totalRating = plugin.reviews.reduce((sum, review) => sum + review.rating, 0);
      plugin.rating = totalRating / plugin.reviews.length;

      await plugin.save();
      res.status(201).json(plugin);
    } catch (error) {
      res.status(500).json({ message: '添加评论失败' });
    }
  }
);

// 更新下载次数
router.post('/:id/download', async (req, res) => {
  try {
    const plugin = await Plugin.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!plugin) {
      return res.status(404).json({ message: '插件不存在' });
    }

    res.json(plugin);
  } catch (error) {
    res.status(500).json({ message: '更新下载次数失败' });
  }
});

module.exports = router;