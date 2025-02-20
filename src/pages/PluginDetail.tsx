import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Descriptions, Typography, message } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { Plugin } from '../types';
import { getPlugin } from '../services/api';

const { Title, Paragraph } = Typography;

const PluginDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [plugin, setPlugin] = useState<Plugin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPluginDetail = async () => {
      if (!id) return;
      try {
        const data = await getPlugin(id);
        setPlugin(data);
      } catch (error) {
        message.error('获取插件详情失败');
      } finally {
        setLoading(false);
      }
    };

    fetchPluginDetail();
  }, [id]);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!plugin) {
    return <div>未找到插件</div>;
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card
        loading={loading}
        cover={
          <div style={{ height: '400px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {plugin.imageUrl ? (
              <img
                alt={plugin.title}
                src={plugin.imageUrl}
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
                display: plugin.imageUrl ? 'none' : 'block',
              }}
            />
          </div>
        }
        actions={[
          <Button type="primary" key="download" href={plugin.downloadUrl} target="_blank" size="small" style={{ minWidth: '80px', padding: '0.6em 1em' }}>
            下载插件
          </Button>
        ]}
      >
        <Title level={2}>{plugin.title}</Title>
        <Descriptions column={1} style={{ marginBottom: '24px' }}>
          <Descriptions.Item label="更新时间">{plugin.updatedAt}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{plugin.createdAt}</Descriptions.Item>
        </Descriptions>

        <Title level={3}>插件描述</Title>
        <Paragraph>{plugin.description}</Paragraph>

        <Title level={3}>使用说明</Title>
        <Paragraph>
          {plugin.instructions.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Paragraph>
      </Card>
    </div>
  );
};

export default PluginDetail;