// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MainPage from './pages/MainPage';
import Orders from './pages/Orders';
import Transactions from './pages/Transactions';
import Menu from './pages/Menu';

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
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
