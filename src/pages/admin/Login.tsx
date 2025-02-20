import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'admin123'; // 在实际应用中，这个密码应该存储在服务器端
const AUTH_KEY = 'admin_auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 检查是否已经登录
    const isAuthenticated = localStorage.getItem(AUTH_KEY) === 'true';
    if (isAuthenticated) {
      navigate('/admin/plugins');
    }
  }, [navigate]);

  const handleSubmit = async (values: { password: string }) => {
    setLoading(true);
    try {
      if (values.password === ADMIN_PASSWORD) {
        localStorage.setItem(AUTH_KEY, 'true');
        message.success('登录成功');
        navigate('/admin/plugins');
      } else {
        message.error('密码错误');
      }
    } catch (error) {
      message.error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <div style={{
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>管理员登录</h1>
        <Form
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入管理员密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;