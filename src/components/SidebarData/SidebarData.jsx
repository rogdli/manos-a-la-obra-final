import React from "react";
import * as AiIcons from "react-icons/ai";
import '../../styles/styles.css';  

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "My Projects",
    path: "/my-projects", 
    icon: <AiIcons.AiFillFolder />,
    cName: "nav-text",
  },
  {
    title: "My Stories",
    path: "/my-stories", 
    icon: <AiIcons.AiFillFolder />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <AiIcons.AiOutlineUser />,
    cName: "nav-text",
  }
];
