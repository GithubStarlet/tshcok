import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Descriptions, Typography } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { Plugin } from '../types';

const { Title, Paragraph } = Typography;

// 模拟数据
const mockPlugin: Plugin = {
  id: '1',
  title: '示例插件1',
  description: '这是一个示例插件的详细描述',
  imageUrl: 'https://via.placeholder.com/600x300',
  downloadUrl: 'https://example.com/download/1',
  instructions: '1. 下载插件文件\n2. 解压到游戏目录\n3. 启动游戏即可使用',
  createdAt: '2024-02-20',
  updatedAt: '2024-02-20'
};

const PluginDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card
        cover={
          <div style={{ height: '400px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {mockPlugin.imageUrl ? (
              <img
                alt={mockPlugin.title}
                src={mockPlugin.imageUrl}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement?.querySelector('.fallback-icon')?.removeAttribute('style');
                }}
              />
            ) : null}
            <PictureOutlined
              className="fallback-icon"
              style={{
                fontSize: '64px',
                color: '#d9d9d9',
                display: mockPlugin.imageUrl ? 'none' : 'block',
              }}
            />
          </div>
        }
        actions={[
          <Button type="primary" key="download" href={mockPlugin.downloadUrl} target="_blank" size="small" style={{ minWidth: '80px', padding: '0.6em 1em' }}>
            下载插件
          </Button>
        ]}
      >
        <Title level={2}>{mockPlugin.title}</Title>
        <Descriptions column={1} style={{ marginBottom: '24px' }}>
          <Descriptions.Item label="更新时间">{mockPlugin.updatedAt}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{mockPlugin.createdAt}</Descriptions.Item>
        </Descriptions>

        <Title level={3}>插件描述</Title>
        <Paragraph>{mockPlugin.description}</Paragraph>

        <Title level={3}>使用说明</Title>
        <Paragraph>
          {mockPlugin.instructions.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Paragraph>
      </Card>
    </div>
  );
};

export default PluginDetail;