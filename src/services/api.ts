import axios from 'axios';
import { Plugin, PluginListResponse, PluginDetailResponse } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 获取插件列表
export const getPlugins = async (): Promise<Plugin[]> => {
  const response = await api.get('/plugins');
  return response.data;
};

// 获取单个插件详情
export const getPlugin = async (id: string): Promise<Plugin> => {
  const response = await api.get(`/plugins/${id}`);
  return response.data;
};

// 创建插件
export const createPlugin = async (plugin: Omit<Plugin, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plugin> => {
  const response = await api.post('/plugins', plugin);
  return response.data;
};

// 更新插件
export const updatePlugin = async (id: string, plugin: Partial<Plugin>): Promise<Plugin> => {
  const response = await api.put(`/plugins/${id}`, plugin);
  return response.data;
};

// 删除插件
export const deletePlugin = async (id: string): Promise<void> => {
  await api.delete(`/plugins/${id}`);
};

// 添加评论和评分
export const addReview = async (pluginId: string, review: { user: string; comment: string; rating: number }) => {
  const response = await api.post(`/plugins/${pluginId}/reviews`, review);
  return response.data;
};

// 更新下载次数
export const updateDownloads = async (pluginId: string) => {
  const response = await api.post(`/plugins/${pluginId}/download`);
  return response.data;
};