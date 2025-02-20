import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Plugin } from '../../types';
import { getPlugins, createPlugin, updatePlugin, deletePlugin } from '../../services/api';

const PluginManagement: React.FC = () => {
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

// 初始数据仅用于开发参考
const initialPlugins = [
    {
      id: '1',
      title: '图片优化插件',
      description: '自动压缩和优化上传的图片，提高网站加载速度',
      imageUrl: 'https://example.com/image-optimizer.png',
      downloadUrl: 'https://example.com/plugins/image-optimizer.zip',
      instructions: '安装后即可自动优化上传的图片，支持 JPG、PNG、WebP 等格式',
      createdAt: '2024-01-15T08:00:00Z',
      updatedAt: '2024-01-15T08:00:00Z'
    },
    {
      id: '2',
      title: 'SEO 助手',
      description: '优化网站的搜索引擎表现，提供关键词建议和页面分析',
      imageUrl: 'https://example.com/seo-assistant.png',
      downloadUrl: 'https://example.com/plugins/seo-assistant.zip',
      instructions: '在仪表盘中查看 SEO 分析报告，根据建议优化网站内容',
      createdAt: '2024-01-16T10:30:00Z',
      updatedAt: '2024-01-16T10:30:00Z'
    },
    {
      id: '3',
      title: '安全扫描器',
      description: '定期扫描网站漏洞，提供安全评估报告',
      imageUrl: 'https://example.com/security-scanner.png',
      downloadUrl: 'https://example.com/plugins/security-scanner.zip',
      instructions: '每周自动进行安全扫描，发现问题时通过邮件通知管理员',
      createdAt: '2024-01-17T14:20:00Z',
      updatedAt: '2024-01-17T14:20:00Z'
    }
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlugin, setEditingPlugin] = useState<Plugin | null>(null);
  const [form] = Form.useForm();

  // 表格列定义
  const columns = [
    {
      title: '插件名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Plugin) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 处理编辑
  const handleEdit = (plugin: Plugin) => {
    setEditingPlugin(plugin);
    form.setFieldsValue(plugin);
    setIsModalVisible(true);
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个插件吗？',
      onOk: async () => {
        try {
          await deletePlugin(id);
          await fetchPlugins();
          message.success('删除成功');
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  // 处理表单提交
  const handleSubmit = async (values: any) => {
    try {
      if (editingPlugin) {
        await updatePlugin(editingPlugin.id, values);
        message.success('更新成功');
      } else {
        await createPlugin(values);
        message.success('创建成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingPlugin(null);
      await fetchPlugins();
    } catch (error) {
      message.error('操作失败');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingPlugin(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          添加插件
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={plugins}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        loading={loading}
      />

      <Modal
        title={editingPlugin ? '编辑插件' : '添加插件'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingPlugin(null);
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="插件名称"
            rules={[{ required: true, message: '请输入插件名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入插件描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="图片URL"
            rules={[{ required: true, message: '请输入图片URL' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="downloadUrl"
            label="下载URL"
            rules={[{ required: true, message: '请输入下载URL' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="instructions"
            label="使用说明"
            rules={[{ required: true, message: '请输入使用说明' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PluginManagement;