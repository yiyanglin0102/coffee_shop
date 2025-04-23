import { NavLink } from 'react-router-dom';

const NavItem = ({ to, icon, label }) => (
  <NavLink 
    to={to}
    className={({ isActive }) => 
      `nav-item ${isActive ? 'active' : ''}`
    }>
    <span className="nav-icon">{icon}</span>
    <span className="nav-label">{label}</span>
  </NavLink>
);

export default NavItem;