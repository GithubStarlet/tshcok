import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PluginList from './pages/PluginList';
import PluginDetail from './pages/PluginDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PluginList />} />
        <Route path="/plugin/:id" element={<PluginDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
