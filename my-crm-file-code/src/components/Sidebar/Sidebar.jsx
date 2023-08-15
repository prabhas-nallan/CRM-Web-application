import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
// import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import {IoPersonCircle} from 'react-icons/io5';
import dashicon from '../../assets/dashicon.png';
import custdash from '../../assets/custdash.png';
import leaddash from '../../assets/leaddash.png';
import oppdash from '../../assets/oppdash.png';
import saledash from '../../assets/saledash.png';
import taskdash from '../../assets/taskdash.png';
import ticketdash from '../../assets/ticketdash.png';
import logoImage from '../../assets/logoCRM.png';

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAdmin=()=>{
    navigate('/dashboard');
  }
  
  const handleLogOut=()=>{
    navigate('/login');

  }

  return (
    <div className="sidebar">
      <div className="logo">
        <NavLink to="/dashboard">
        <img src={logoImage} alt="logoImage"/>
        </NavLink>
      </div>
      <nav className="navigation-menu">
        <ul>
          <NavLink to="/dashboard"><img src={dashicon} alt="dashicon"/>Dashboard</NavLink>
          <NavLink to="/customers"><img src={custdash} alt="custdash"/>Customers</NavLink>
          <NavLink to="/leads"><img src={leaddash} alt="leaddash"/>Leads</NavLink>
          <NavLink to="/opportunities"><img src={oppdash} alt="oppdash"/>Opportunities</NavLink>
          <NavLink to="/sales"><img src={saledash} alt="saledash"/>Sales</NavLink>
          <NavLink to="/tasks"><img src={taskdash} alt="taskdash"/>Tasks</NavLink>
          <NavLink to="/tickets"><img src={ticketdash} alt="ticketdash"/>Tickets</NavLink>
        </ul>
      </nav>
      <div className="user-profile">
        <div className="user-profile-section">
          <div className="profile-image">
          <IoPersonCircle fontSize="1.6rem" onClick={handleAdmin}/> 
          </div>
          <div className="profile-details">
            <h3 onClick={handleAdmin} className="Admin-profile">Admin</h3>
          </div>
         
        </div>
        
        {/* <div className="dropdown ">
          < BiUpArrowCircle onClick={toggleDropdown} />
          {           
          dropdownOpen && (
              <optgroup className="options-list">
                <option value="settings">Settings</option>
                <option value="help">Help</option>
              </optgroup>
          )
        }
        </div> */}
      </div>
      <div className="logout-btn">
            <button onClick={handleLogOut}>Logout</button>
          </div>
    </div>
  );
};

export default Sidebar;
