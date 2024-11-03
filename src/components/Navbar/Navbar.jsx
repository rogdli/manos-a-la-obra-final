import React, { useState } from 'react';
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";

import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from '../SidebarData/SidebarData'
import '../../styles/styles.css'; 

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
  
    const showSidebar = () => setSidebar(!sidebar);
  
    return (
      <>
        <IconContext.Provider value={{ color: "undefined" }}>
          <div className="navbar">
            <Link to="#" className="menuBars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "navMenu active" : "navMenu"}>
            <ul className="navMenuItems" onClick={showSidebar}>
              <li className="navbarToggle">
                <Link to="#" className="menuBars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => (
                <li key={index} className="navText">
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
  
  export default Navbar;