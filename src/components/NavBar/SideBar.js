/*  
This component gives out the side nav bar which gets rendered at every page (service inventory, platform dashboard, customer solution dashboard). 
This component is called by ServiceInventoryPage.js file, CsVersionPage.js file, PltVersionPage.js file.

This component shows the icons. So when clicked they are taken to respective page.
*/

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPaintBrush } from "react-icons/fa";
import './SideBar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <button 
        className={`node-monitor ${location.pathname === '/node-usage' ? 'active' : ''}`}
        onClick={() => handleNavigation('/whiteboard')}
        data-tooltip="White Board"
      >
        <FaPaintBrush />
      </button>
    </div>
  );
};

export default Sidebar;