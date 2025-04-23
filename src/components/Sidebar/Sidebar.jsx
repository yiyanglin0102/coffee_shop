// src/components/Sidebar/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import NavItem from './NavItem';
import './Sidebar.css';

const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState({ menuManagement: false });

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem('sidebarState');
    if (saved) setExpandedSections(JSON.parse(saved));
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem('sidebarState', JSON.stringify(expandedSections));
  }, [expandedSections]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Dashboard</h3>
      </div>

      <nav className="sidebar-nav">
        <SidebarGroup title="Operations">
          <NavItem to="/" icon="📊" label="Main Dashboard" />
          <NavItem to="/orders" icon="🧾" label="Order Tickets" />
          <NavItem to="/smart-ordering" icon="🤖" label="Smart Ordering" />
          <NavItem to="/kitchen" icon="👨‍🍳" label="Kitchen Display" />
          <NavItem to="/customer" icon="👀" label="Customer Display" />
        </SidebarGroup>

        <SidebarGroup title="Financial">
          <NavItem to="/transactions" icon="💳" label="Transactions" />
          <NavItem to="/discounts" icon="🏷️" label="Discounts" />
          <NavItem to="/income-reports" icon="📈" label="Income Report" />
        </SidebarGroup>

        <div className="nav-group">
          <div className="menu-label" onClick={() => toggleSection('menuManagement')}>
            <span className="nav-icon">📋</span>
            <span>Menu Management</span>
            {expandedSections.menuManagement ? <FiChevronDown /> : <FiChevronRight />}
          </div>
          {expandedSections.menuManagement && (
            <div className="submenu">
              <NavItem to="/menu/overview" icon="📊" label="Menu Overview" indent/>
              <NavItem to="/menu/editor" icon="✏️" label="Menu Editor" indent />
              <NavItem to="/menu/categories" icon="🗂️" label="Categories" indent />
              <NavItem to="/menu/dishes" icon="🍛" label="Dishes" indent />
              <NavItem to="/menu/addons" icon="➕" label="Add-Ons" indent />
              <NavItem to="/menu/preferences" icon="⚙️" label="Preference" indent />
              <NavItem to="/menu/instock" icon="📦" label="In Stock" indent />
              <NavItem to="/menu/printings" icon="🖨️" label="Printings" indent />
              <NavItem to="/menu/settings" icon="🔧" label="Menu Settings" indent />
            </div>
          )}
        </div>

        <SidebarGroup title="System">
          <NavItem to="/devices" icon="💻" label="Devices" />
          <NavItem to="/account" icon="👤" label="Account" />
          <NavItem to="/settings" icon="⚙️" label="Settings" />
        </SidebarGroup>
      </nav>
    </div>
  );
};

const SidebarGroup = ({ title, children }) => (
  <div className="nav-group">
    <p className="group-title">{title}</p>
    {children}
  </div>
);

export default Sidebar;
