/*  
This component gives out the top nav bar which gets rendered at every page (service inventory, platform dashboard, customer solution 
dashboard). This component is called by CsVersionPage.js file, ServiceInventoryPage.js file, PltVersionPage.js file.

This component renders title of page dynamically which is given from the calling component. It also renders the logged-in user's first
name which is stored in seesionStorage and also a logout button when the user clicks the session is cleared and they are brought back to 
login page.
*/

import React, {useState, useEffect} from 'react';
import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";


const Navbar = ({title}) => {
  const [marginLeft, setMarginLeft] = useState("95%");

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    sessionStorage.removeItem("userFirstName");
    navigate(path);
  };

  const storedUserFirstname = sessionStorage.getItem("userFirstName");
  const formattedUserFirstname = storedUserFirstname 
    ? storedUserFirstname.charAt(0).toUpperCase() + storedUserFirstname.slice(1).toLowerCase() 
    : "";

    useEffect(() => {
      const updateMargin = () => {
        const screenWidth = window.innerWidth; // Get the current viewport width
        const calculatedMargin = `${95 - formattedUserFirstname.length}%`;
        let minMargin;
        if (screenWidth <= 320) {
          minMargin = `${51 - formattedUserFirstname.length}%`;        // Very small screens (phones)
        } else if (screenWidth <= 375) {
          minMargin = `${60 - formattedUserFirstname.length}%`;      // Small screens
        } else if (screenWidth <= 426) {
          minMargin = `${65 - formattedUserFirstname.length}%`;      // Medium-small screens
        } else if (screenWidth <= 768) {
          minMargin = `${82 - formattedUserFirstname.length}%`;      // Tablets
        } else if (screenWidth <= 1025) {
          minMargin = `${90 - formattedUserFirstname.length}%`;      // laptop
        }else if (screenWidth <= 1441) {
          minMargin = `${95 - formattedUserFirstname.length}%`;       // laptop
        }else if (screenWidth <= 1921) {
          minMargin = `${95 - formattedUserFirstname.length}%`;       // my screen
        }else if (screenWidth > 1921) {
          minMargin = `${98 - formattedUserFirstname.length}%`;       // Tablets
        }else {
          minMargin = calculatedMargin; // Default for larger screens
        }
  
        setMarginLeft(minMargin);
      };
  
      updateMargin(); // Initial calculation
      window.addEventListener("resize", updateMargin); // Listen for window resize
  
      return () => window.removeEventListener("resize", updateMargin); // Cleanup
    }, [formattedUserFirstname]);
  

  return (
    <nav className="navbar">
      <span className="app-name">{title}</span>
      {/* <div className="navbar-right" style={{ marginLeft }}>
        <span className="user-name">
          <FaUserAlt/> &nbsp; Hi {formattedUserFirstname} 
        </span>
        <button 
          className={`signout-button ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => handleNavigation('/')} 
          data-tooltip="Log-Out"
        >
          <FaSignOutAlt />
        </button>
      </div> */}
    </nav>
  );
}

export default Navbar;
