import React, { useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LogoutButton from "../LOGOUT/Logout";

function NavBar() {

    useEffect(() => {
        // Get current page URL path
        const currentPath = window.location.pathname;
        
        // Get all links
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Loop through all nav links to remove 'active' class
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add 'active' class to the current page link
        const activeLink = Array.from(navLinks).find(link => link.getAttribute('href') === currentPath);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }, []);

    return (
        <header className="header fixed-top">
            <nav className="navbar navbar-expand-lg navbar-light bg-info shadow">
                <div className="container-fluid">
                    {/* Navbar Brand */}
                    <a href="/menu-master" className="navbar-brand fw-bold text-black">
                        <span className="d-none d-lg-inline">Admin </span>
                        <strong>DashBoard</strong>
                    </a>

                    {/* Toggle Button for Small Screens */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Items */}
                    <div
                        className="collapse navbar-collapse justify-content-between"
                        id="navbarNav"
                    >
                        {/* Left Items (Menu Links as Buttons) */}
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link btn btn-outline-dark fw-semibold me-2 text-white" href="/menu-master">
                                    Menu Master
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn btn-outline-dark fw-semibold me-2 text-white" href="/content-master">
                                    Content Master
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn btn-outline-dark fw-semibold text-white" href="/file-upload">
                                    File Upload Master
                                </a>
                            </li>
                        </ul>

                        {/* Right Items */}
                        <ul className="navbar-nav ms-auto d-flex align-items-center">
                            {/* Logout */}
                            <li className="nav-item ms-3">
                                <LogoutButton />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
