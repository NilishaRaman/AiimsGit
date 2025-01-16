import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './UserNavBar.css'; 

const UserNavBar = () => {
  const [menuData, setMenuData] = useState([]);  // State to store menu items
  const [activeMenus, setActiveMenus] = useState({}); // Track active dropdowns

  // Store refs for each dropdown to calculate overflow
  const dropdownRefs = useRef({});

  // Fetch menu data from backend on component mount
  useEffect(() => {
    axios.get("http://10.226.25.102:8080/api/menus/nested") // Adjust the API endpoint as necessary
      .then((response) => {
        console.log("Menu data:", response.data); // Log the data for debugging
        setMenuData(response.data); // Store fetched menu items
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  // Toggle dropdown visibility for nested menus
  const toggleDropdown = (menuId) => {
    setActiveMenus((prevState) => ({
      ...prevState,
      [menuId]: !prevState[menuId], // Toggle visibility of the clicked menu
    }));
  };

  // Handle mouse enter to determine overflow
  const handleMouseEnter = (menuId) => {
    setActiveMenus((prevState) => ({
      ...prevState,
      [menuId]: true, // Show the menu on hover
    }));

    const dropdownMenu = dropdownRefs.current[menuId]; // Get the dropdown menu ref

    if (dropdownMenu) {
      const rect = dropdownMenu.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      // If dropdown overflows on the right, move it to the left
      if (rect.right > windowWidth) {
        dropdownMenu.classList.add("dropdown-menu-right");
        dropdownMenu.classList.remove("dropdown-menu-left");
      } else {
        dropdownMenu.classList.add("dropdown-menu-left");
        dropdownMenu.classList.remove("dropdown-menu-right");
      }
    }
  };

  const handleMouseLeave = (menuId) => {
    setActiveMenus((prevState) => ({
      ...prevState,
      [menuId]: false, // Hide the menu when mouse leaves
    }));
  };

  // Recursive function to render menu items and submenus
  const renderMenuItems = (menus, level = 0) => {
    return menus.map((menu) => (
      <li
        key={`${menu.menu_id}-${level}`} // Create a unique key using menu.menu_id and level
        className="nav-item dropdown"
        onMouseEnter={() => handleMouseEnter(menu.menu_id)}
        onMouseLeave={() => handleMouseLeave(menu.menu_id)}
      >
        <a
          className="nav-link dropdown-toggle"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleDropdown(menu.menu_id); // Toggle submenu on click
          }}
        >
          {menu.menu_name}
        </a>

        {/* Render submenu if there are children */}
        {menu.children && menu.children.length > 0 && (
          <>
          <span className="sub-arrow"></span>
          <ul
            className={`dropdown-menu ${activeMenus[menu.menu_id] ? "show" : ""}`}
            ref={(el) => { dropdownRefs.current[menu.menu_id] = el }} // Assign ref for position checking
          >
            
            {renderMenuItems(menu.children, level + 1)} {/* Recursive rendering of child menus */}
            
          </ul>
          </>
          
          
        )}
      </li>
    ));
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {menuData.length > 0 ? renderMenuItems(menuData) : <li className="nav-item">Loading...</li>}
      </ul>
    </nav>
  );
};

export default UserNavBar;
