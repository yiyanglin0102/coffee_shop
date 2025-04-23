// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MainPage from './pages/MainPage';
import Orders from './pages/Orders';
import Transactions from './pages/Transactions';
import Menu from './pages/Menu';
import MenuOverview from './pages/MenuOverview/MenuOverview';

import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure({
  ...config,
  API: {
    ...config.API,
    endpoints: [
      {
        name: "menuApi",
        endpoint: process.env.REACT_APP_API_ENDPOINT,
        region: process.env.REACT_APP_REGION,
        custom_header: async () => ({
          'x-api-key': process.env.REACT_APP_API_KEY
        })
      }
    ]
  }
});

const App = () => (
  <Router>
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/overview" element={<MenuOverview />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
