// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import './Sidebar.css';
import NavItem from './NavItem';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>☕ CoffeeShop Pro</h3>
      </div>
      
      <nav className="sidebar-nav">
        {/* Core Operations */}
        <div className="nav-group">
          <p className="group-title">Operations</p>
          <NavItem to="/" icon="📊" label="Main Dashboard" />
          <NavItem to="/orders" icon="🧾" label="Order Tickets" />
          <NavItem to="/smart-ordering" icon="🤖" label="Smart Ordering" />
          <NavItem to="/kitchen" icon="👨‍🍳" label="Kitchen Display" />
          <NavItem to="/customer" icon="👀" label="Customer Display" />
        </div>

        {/* Financial */}
        <div className="nav-group">
          <p className="group-title">Financial</p>
          <NavItem to="/transactions" icon="💳" label="Transactions" />
          <NavItem to="/discounts" icon="🏷️" label="Discounts" />
          <NavItem to="/income-reports" icon="📈" label="Income Report" />
        </div>

        {/* Management */}
        <div className="nav-group">
          <p className="group-title">Management</p>
          <NavItem to="/menu" icon="📋" label="Menu Management" />
          <NavItem to="/team" icon="👥" label="Team Management" />
          <NavItem to="/reservations" icon="📅" label="Reservations" />
          <NavItem to="/tables" icon="🪑" label="Sitting Area" />
          <NavItem to="/membership" icon="🎫" label="Membership" />
        </div>

        {/* System */}
        <div className="nav-group">
          <p className="group-title">System</p>
          <NavItem to="/devices" icon="💻" label="Devices" />
          <NavItem to="/account" icon="👤" label="Account" />
          <NavItem to="/settings" icon="⚙️" label="Settings" />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;