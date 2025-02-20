import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PluginList from './pages/PluginList';
import PluginDetail from './pages/PluginDetail';
import PluginManagement from './pages/admin/PluginManagement';
import Login from './pages/admin/Login';
import RequireAuth from './components/auth/RequireAuth';

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
    path: '/admin/login',
    element: <Login />
  },
  {
    path: '/admin/plugins',
    element: <RequireAuth><PluginManagement /></RequireAuth>,
  },
]);

export default router;