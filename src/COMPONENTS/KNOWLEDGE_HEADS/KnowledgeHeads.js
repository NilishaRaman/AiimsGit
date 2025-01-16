import React from "react";
import './KnowledgeHeads.css'; // Assuming you have a separate CSS file for custom styling
import NavBar from "../NAVBAR/NavBar"; // Assuming NavBar is a separate component

const KnowledgeHeads = () => {
  return (
    <div className="page">
      {/* Navbar */}
      <NavBar />

      {/* Main content area */}
      <div className="page-content d-flex">
        
        {/* Sidebar */} 
        <nav className="side-navbar">
          <div className="sidebar-header d-flex align-items-center">
            <div className="avatar">
              <img
                src="./images/khlogo.png"
                className="img-fluid rounded-circle"
                alt="Admin Avatar"
              />
            </div>
            <div className="title">
              <h1 className="h4">ADMIN</h1>
              <p>LMS ADMIN</p>
            </div>
          </div>

          {/* Sidebar Menu */}
          <ul className="list-unstyled">
            <li className="active">
              <a href="#">
                <i className="fa fa-tachometer"></i> Dashboard
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-user-o"></i> Profile
              </a>
            </li>
          </ul>
        </nav>

        {/* Content Section */}
        <div className="content-inner">
          <header className="page-header">
            <div className="container-fluid">
              <h2 className="no-margin-bottom">Dashboard</h2>
            </div>
          </header>

          {/* Dashboard Count Section */}
          <section className="dashboard-counts">
            <div className="container-fluid">
              <div className="row">
                {/* Dashboard Item 1 */}
                <div className="col-xl-3 col-sm-6">
                  <div className="item d-flex align-items-center">
                    <div className="icon bg-orange">
                      <i className="icon-check"></i>
                    </div>
                    <div className="title">
                      <span>Total<br />University Requests</span>
                      <div className="progress">
                        <div
                          className="progress-bar bg-orange"
                          role="progressbar"
                          style={{ width: "80.5%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="number">
                      <strong>450</strong>
                    </div>
                  </div>
                </div>
                {/* Add more dashboard items here */}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 text-left text-center">
              <a target="_blank" rel="noreferrer" href="https://cdac.in/">
                <img
                  src="./images/cdac_logo.png"
                  alt="CDAC Logo"
                  className="footer-logo"
                />
              </a>
            </div>
            <div className="col-md-6 text-right text-center">
              <p>&copy; {new Date().getFullYear()} KnowledgeHeads | All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KnowledgeHeads;
