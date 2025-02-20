import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PluginList from './pages/PluginList';
import PluginDetail from './pages/PluginDetail';
import PluginManagement from './pages/admin/PluginManagement';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PluginList />,
  },
  {
    path: '/plugin/:id',
    element: <PluginDetail />,
  },
  {
    path: '/admin/plugins',
    element: <PluginManagement />,
  },
]);

export default router;