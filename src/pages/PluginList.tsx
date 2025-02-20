import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Spin, message } from 'antd';
import { Link } from 'react-router-dom';
import { PictureOutlined } from '@ant-design/icons';
import { Plugin } from '../types';
import { getPlugins } from '../services/api';

const { Meta } = Card;

const PluginList: React.FC = () => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlugins();
  }, []);

  const fetchPlugins = async () => {
    setLoading(true);
    try {
      const data = await getPlugins();
      setPlugins(data);
    } catch (error) {
      message.error('获取插件列表失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '24px' }}>Tshock插件市场</h1>
      <Row gutter={[16, 16]} style={{ width: '100%' }}>
        {plugins.map((plugin) => (
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