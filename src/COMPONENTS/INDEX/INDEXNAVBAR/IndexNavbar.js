// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./IndexNavbar.css"; // Make sure this is correctly styling the navbar
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// const IndexNavbar = ({isHindi}) => {
//   const [menuData, setMenuData] = useState([]); // Menu data state
//   const [activeMenus, setActiveMenus] = useState({}); // Active dropdown menu state
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu open state
//   const [selectedMenu, setSelectedMenu] = useState(null); // Selected menu state
//   const [contentData, setContentData] = useState(null); // Content data state
//   const dropdownRefs = useRef({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetching menu data from API
//     axios
//       .get("http://10.226.25.102:8080/api/menus/nested")
//       .then((response) => {
//         const navItems = response.data.filter(item => item.isQuickLink === null);
//         setMenuData(navItems); // Set menu data after API call
//       })
//       .catch((error) => {
//         console.error("Error fetching menu data:", error);
//       });

//     // Retrieve the stored menu and content data from localStorage if available
//     const storedMenu = localStorage.getItem("selectedMenu");
//     const storedContent = localStorage.getItem("contentData");

//     if (storedMenu && storedContent) {
//       setSelectedMenu(JSON.parse(storedMenu));
//       setContentData(JSON.parse(storedContent));
//     }
//   }, []);

//   const toggleDropdown = (menuId) => {
//     setActiveMenus((prevState) => ({
//       ...prevState,
//       [menuId]: !prevState[menuId],
//     }));
//   };

//   const handleMouseEnter = (menuId) => {
//     setActiveMenus((prevState) => ({
//       ...prevState,
//       [menuId]: true,
//     }));

//     const dropdownMenu = dropdownRefs.current[menuId];
//     if (dropdownMenu) {
//       const rect = dropdownMenu.getBoundingClientRect();
//       const windowWidth = window.innerWidth;

//       if (rect.right > windowWidth) {
//         dropdownMenu.classList.add("dropdown-menu-right");
//         dropdownMenu.classList.remove("dropdown-menu-left");
//       } else {
//         dropdownMenu.classList.add("dropdown-menu-left");
//         dropdownMenu.classList.remove("dropdown-menu-right");
//       }
//     }
//   };

//   const handleMouseLeave = (menuId) => {
//     setActiveMenus((prevState) => ({
//       ...prevState,
//       [menuId]: false,
//     }));
//   };

//   const handleMenuClick = (menu, event) => {
//     event.preventDefault(); // Prevent page reload
//     if (!menu.menu_id) {
//       console.error("Menu ID is missing");
//       return;
//     }
//     setSelectedMenu(menu); // Set selected menu
//     // Fetch the content for the selected menu
//     axios
//       .get(`http://10.226.25.102:8080/api/content/${menu.menu_id}`)
//       .then((response) => {
//         setContentData(response.data); // Set the fetched content data
//         // Store the selected menu and content data in localStorage
//         localStorage.setItem("selectedMenu", JSON.stringify(menu));
//         localStorage.setItem("contentData", JSON.stringify(response.data));

//         // Navigate to the new page with selected menu's content
//         navigate(`/menu/${menu.menu_id}`); // Navigate to a new route with menu ID
//       })
//       .catch((error) => {
//         console.error("Error fetching content:", error);
//       });
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const renderMenuItems = (menus, level = 0) => {
//     return menus.map((menu) => (
//       <li
//         key={`${menu.menu_id}-${level}`}
//         className={`nav-item ${menu.children?.length ? "dropdown" : ""}`}
//         onMouseEnter={() => handleMouseEnter(menu.menu_id)}
//         onMouseLeave={() => handleMouseLeave(menu.menu_id)}
//       >
//         <a
//           className={`nav-link ${menu.children?.length ? "dropdown-toggle" : ""}`}
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             toggleDropdown(menu.menu_id);
//             handleMenuClick(menu, e); // Call function to fetch content on menu click
//           }}
//         >
//           {isHindi && menu.hindiMenuName ? menu.hindiMenuName : menu.menu_name}
//         </a>

//         {/* Render submenus */}
//         {menu.children && menu.children.length > 0 && (
//           <ul
//             className={`dropdown-menu ${activeMenus[menu.menu_id] ? "show" : ""}`}
//             ref={(el) => {
//               dropdownRefs.current[menu.menu_id] = el;
//             }}
//           >
//             {renderMenuItems(menu.children, level + 1)}
//           </ul>
//         )}
//       </li>
//     ));

//   };

//   return (
//     // <nav className="navbar navbar-expand-lg  navbar-light custom-navbar">
//     //   <button className="navbar-toggler" type="button" onClick={toggleMobileMenu}>
//     //     <span className="navbar-toggler-icon"></span>
//     //   </button>
//         <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
//       <button
//         className="navbar-toggler"
//         type="button"
//         onClick={toggleMobileMenu}
//         aria-controls="navbarNav"
//         aria-expanded={isMobileMenuOpen ? "true" : "false"}
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       {/* <ul className="navbar-nav mr-auto">
//           {menuData.length > 0 ? (
//             renderMenuItems(menuData)
//           ) : (
//             <li className="nav-item">Loading...</li>
//           )}
//         </ul> */}
//       <ul className={`navbar-nav ${isMobileMenuOpen ? "show" : ""}`}>
//         {menuData.length > 0 ? renderMenuItems(menuData)
//           : <li className="nav-item">Loading...</li>}
//       </ul>

//     </nav>

//   );
// };

// export default IndexNavbar;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './IndexNavbar.css'; // Ensure this is correctly styling the navbar
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const IndexNavbar = ({ isHindi }) => {
  const [menuData, setMenuData] = useState([]); // Menu data state
  const [activeMenus, setActiveMenus] = useState({}); // Active dropdown menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu open state
  const [selectedMenu, setSelectedMenu] = useState(null); // Selected menu state
  const [contentData, setContentData] = useState(null); // Content data state
  const dropdownRefs = useRef({}); // Dropdown reference for each menu
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    // Fetching menu data from API
    axios
      .get("http://10.226.25.102:8080/api/menus/nested")
      .then((response) => {
        const navItems = response.data.filter(item => item.isQuickLink === null);
        setMenuData(navItems); // Set menu data after API call
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });

    // Retrieve the stored menu and content data from localStorage if available
    const storedMenu = localStorage.getItem("selectedMenu");
    const storedContent = localStorage.getItem("contentData");

    if (storedMenu && storedContent) {
      setSelectedMenu(JSON.parse(storedMenu));
      setContentData(JSON.parse(storedContent));
    }
  }, []);

  const toggleDropdown = (menuId) => {
    setActiveMenus((prevState) => ({
      ...prevState,
      [menuId]: !prevState[menuId],
    }));
  };

  const handleMouseEnter = (menuId) => {
    setActiveMenus((prevState) => ({
      ...prevState,
      [menuId]: true,
    }));

    const dropdownMenu = dropdownRefs.current[menuId];
    if (dropdownMenu) {
      const rect = dropdownMenu.getBoundingClientRect();
      const windowWidth = window.innerWidth;

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
      [menuId]: false,
    }));
  };

  const handleMenuClick = (menu, event) => {
    event.preventDefault(); // Prevent page reload
    if (!menu.menu_id) {
      console.error("Menu ID is missing");
      return;
    }
    setSelectedMenu(menu); // Set selected menu
    // Fetch the content for the selected menu
    axios
      .get(`http://10.226.25.102:8080/api/content/${menu.menu_id}`)
      .then((response) => {
        setContentData(response.data); // Set the fetched content data
        // Store the selected menu and content data in localStorage
        localStorage.setItem("selectedMenu", JSON.stringify(menu));
        localStorage.setItem("contentData", JSON.stringify(response.data));

        // Navigate to the new page with selected menu's content
        navigate(`/menu/${menu.menu_id}`); // Navigate to a new route with menu ID
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const renderMenuItems = (menus, level = 0) => {
    return menus.map((menu) => (
      <li
        key={`${menu.menu_id}-${level}`}
        className={`nav-item ${menu.children?.length ? "dropdown" : ""}`}
        onMouseEnter={() => handleMouseEnter(menu.menu_id)}
        onMouseLeave={() => handleMouseLeave(menu.menu_id)}
      >
        <a
          className={`nav-link ${menu.children?.length ? "dropdown-toggle" : ""}`}
          href="#"
          onClick={(e) => handleMenuClick(menu, e)} // Call function to fetch content on menu click
        >
          {/* Conditional rendering for Hindi translations and Quick Links */}
          {isHindi && menu.hindiMenuName ? menu.hindiMenuName : menu.menu_name}
        </a>

        {/* Render submenus if they exist */}
        {menu.children && menu.children.length > 0 && (
          <ul
            className={`dropdown-menu ${activeMenus[menu.menu_id] ? "show" : ""}`}
            ref={(el) => {
              dropdownRefs.current[menu.menu_id] = el;
            }}
          >
            {renderMenuItems(menu.children, level + 1)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMobileMenu}
        aria-controls="navbarNav"
        aria-expanded={isMobileMenuOpen ? "true" : "false"}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <ul className={`navbar-nav flex-wrap ${isMobileMenuOpen ? "show" : ""}`}>
        {menuData.length > 0 ? renderMenuItems(menuData)
          : <li className="nav-item">Loading...</li>}
      </ul>
    </nav>
  );
};

export default IndexNavbar;


