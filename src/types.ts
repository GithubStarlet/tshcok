// 定义插件的接口
export interface Plugin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  downloadUrl: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
}

// 定义插件列表的响应接口
export interface PluginListResponse {
  plugins: Plugin[];
  total: number;
}

// 定义插件详情的响应接口
export interface PluginDetailResponse {
  plugin: Plugin;
}