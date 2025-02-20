import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PictureOutlined } from '@ant-design/icons';
import { Plugin } from '../types';

const { Meta } = Card;

// 模拟数据
const mockPlugins: Plugin[] = [
  {
    id: '1',
    title: 'AIChatPlugin AI聊天插件',
    description: '它允许玩家通过聊天与一个 AI 对话系统进行互动；该插件提供了一个简单的接口，使得玩家可以通过特定的命令或聊天触发词来向 AI 提出问题，并接收回答。',
    imageUrl: 'https://via.placeholder.com/300',
    downloadUrl: 'https://example.com/download/1',
    instructions: '使用说明...',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20'
  },
  {
    id: '2',
    title: 'AdditionalPylons 放置更多晶塔权',
    description: '自定义晶塔可放置的数量，至少为一个，且所有晶塔都无视环境',
    imageUrl: 'https://via.placeholder.com/300',
    downloadUrl: 'https://example.com/download/1',
    instructions: '使用说明...',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20'
  },
  // 可以添加更多示例数据
];

const PluginList: React.FC = () => {
  return (
    <div className="container">
      <h1 style={{ marginBottom: '24px' }}>游戏插件市场</h1>
      <Row gutter={[16, 16]} style={{ width: '100%' }}>
        {mockPlugins.map((plugin) => (
          <Col xs={24} sm={12} md={8} lg={6} key={plugin.id}>
            <Card
              hoverable
              onClick={() => window.location.href = `/plugin/${plugin.id}`}
              cover={
                <div style={{
                  height: '200px',
                  background: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {plugin.imageUrl ? (
                    <img
                      alt={plugin.title}
                      src={plugin.imageUrl}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
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
                      fontSize: '48px',
                      color: '#d9d9d9',
                      display: plugin.imageUrl ? 'none' : 'block',
                    }}
                  />
                </div>
              }
              actions={[
                <Link to={`/plugin/${plugin.id}`} key="details">
                  <Button type="link" size="small">查看详情</Button>
                </Link>,
                <Button type="primary" size="small" key="download" href={plugin.downloadUrl} style={{ marginLeft: '-10px', minWidth: '60px' }} target="_blank">
                  下载
                </Button>
              ]}
            >
              <Meta
                title={plugin.title}
                description={<div style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  margin: 0
                }}>{plugin.description}</div>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PluginList;